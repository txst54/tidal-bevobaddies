import os
import base64
from auth import google_auth  # Assumes this handles Google API authentication


def get_email_content(service, user_id, msg_id):
    try:
        message = (
            service.users()
            .messages()
            .get(userId=user_id, id=msg_id, format="full")
            .execute()
        )
        headers = {
            header["name"]: header["value"] for header in message["payload"]["headers"]
        }

        parts = message["payload"].get("parts", [])
        body = ""
        for part in parts:
            if part["mimeType"] == "text/plain":
                body = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
                break

        attachments = []
        for part in parts:
            if "filename" in part and part["filename"]:
                attachment = {
                    "filename": part["filename"],
                    "mimeType": part["mimeType"],
                    "headers": part.get("headers", []),
                }

                # Download attachment
                if "body" in part and "attachmentId" in part["body"]:
                    att_id = part["body"]["attachmentId"]
                    att = (
                        service.users()
                        .messages()
                        .attachments()
                        .get(userId=user_id, messageId=msg_id, id=att_id)
                        .execute()
                    )
                    file_data = base64.urlsafe_b64decode(att["data"].encode("UTF-8"))

                    # Create a 'downloads' directory if it doesn't exist
                    if not os.path.exists("downloads"):
                        os.makedirs("downloads")

                    # Save the file
                    file_path = os.path.join("downloads", part["filename"])
                    with open(file_path, "wb") as f:
                        f.write(file_data)

                    # Store the local file path instead of the attachment link
                    attachment["local_path"] = file_path

                attachments.append(attachment)

        email_data = {
            "content": body,
            "attachments": attachments,
            "sender": {
                "name": headers.get("From", "").split("<")[0].strip(),
                "email": headers.get("From", "").split("<")[-1].rstrip(">"),
            },
            "subject": headers.get("Subject", ""),
            "snippet": message.get("snippet", ""),
        }
        return email_data
    except Exception as error:
        print(f"An error occurred: {error}")
        return None


def run_email():
    gmail_service, _ = google_auth()
    user_id = "me"

    results = (
        gmail_service.users()
        .messages()
        .list(userId=user_id)
        .execute()
    )
    messages = results.get("messages", [])

    if not messages:
        print("No messages found.")
    else:
        print("Messages:")
        data = []
        for message in messages:
            email_data = get_email_content(gmail_service, user_id, message["id"])
            if email_data:
                data.append(email_data)
    return data


# Run the function and print the results
print(run_email())
