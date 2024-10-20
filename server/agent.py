import uuid
from datetime import datetime

import PIL
from dotenv import load_dotenv

load_dotenv()  # It must be before llama_index import
from llama_index.core.tools import FunctionTool
from llama_index.llms.openai import OpenAI
from llama_index.core.agent import ReActAgent
from fpdf import FPDF
from typing import List, Dict, Any, Annotated
from get_emails import run_email

import firebase_admin
from firebase_admin import credentials, db

# Path to your Firebase service account key file
cred = credentials.Certificate('./firebase_creds.json')

# Initialize the app with the service account and the Firebase database URL
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tidal-bevobaddies-default-rtdb.firebaseio.com'
})


# Function to write dispute data to Firebase RTDB

def write_dispute_to_firebase(transaction_number: int, dispute_data: Dict[str, str]) -> bool:
    """Writes disputes to database
    :param transaction_number: the provided transaction number of the dispute
    :param dispute_data: a dict representing the disput in the form
    {'cardholderName': 'bob',
    'disputedAmount': '$100.00',
    'lastFourDigits': 1234,
    'reason': 'accidental purchase',
    'reasonCode': 'Visa 10.1',
    'status': 'Pending',
    'transactionDate': '1900-01-01'}
    :return True upon completion"""
    # Reference to the disputes path with the transaction number
    ref = db.reference(f'disputes/{transaction_number}')

    # Writing the dispute data to the reference
    ref.update(dispute_data)
    print(f"Success! data written under transaction number {transaction_number}")
    return True


def add_evidence_to_dispute_db(transaction_number: int, evidence_data: Dict[str, Any]) -> bool:
    """
    Adds evidence to a specific dispute in Firebase with an automatically assigned evidence ID (eid).

    :param transaction_number: The transaction number (int) under which the dispute is stored.
    :param evidence_data: A dictionary containing the evidence details in the form of:
    AttributedDict({
    'type': 'receipt',
    'filename': 'filename.pdf'
    'description': 'Receipt showing the purchase was authorized',
    })
    :return True upon completion
    """
    current_date = datetime.now()

    # Format the current date as YYYY-MM-DD
    formatted_date = current_date.strftime('%Y-%m-%d')
    evidence_data['uploaded_date'] = formatted_date
    # Reference to the evidence path under the transaction number
    ref = db.reference(f'disputes/{transaction_number}/evidence')

    # Use push() to generate a new unique ID for the evidence
    new_evidence_ref = ref.push()

    # Writing the evidence data to the new reference
    new_evidence_ref.set(evidence_data)

    # Retrieve the automatically generated evidence ID (eid)
    evidence_id = new_evidence_ref.key
    print(f"Evidence added under transaction {transaction_number} with auto-assigned evidence ID {evidence_id}")
    return True


def get_evidence_of_dispute_db(transaction_number: int) -> List[Dict[str, Any]]:
    """
    Retrieves all evidence associated with a specific dispute from Firebase.

    :param transaction_number: The transaction number (int) under which the dispute is stored.
    :return: A list of dictionaries representing the evidence, or an empty list if no evidence is found.
    """
    # Reference to the evidence path under the transaction number
    ref = db.reference(f'disputes/{transaction_number}/evidence')

    # Get the evidence data from the database
    evidence_data = ref.get()

    # Check if evidence_data is None (i.e., no evidence exists)
    if evidence_data is None:
        print(f"No evidence found for transaction {transaction_number}.")
        return []

    # Convert the evidence data to a list of dictionaries
    evidence_list = []
    for evidence_id, evidence in evidence_data.items():
        # Add the evidence ID to each evidence dictionary
        evidence['eid'] = evidence_id
        evidence_list.append(evidence)

    return evidence_list


def get_dispute_db() -> List[Dict[str, Any]]:
    """
    Retrieves all disputes
    :return: A list of dictionaries representing the disputes, or an empty list if no disputes are found.
    """
    # Reference to the evidence path under the transaction number
    ref = db.reference(f'disputes')

    # Get the evidence data from the database
    dispute_data = ref.get()

    # Check if evidence_data is None (i.e., no evidence exists)
    if dispute_data is None:
        print(f"No data found for disputes.")
        return []

    # Convert the evidence data to a list of dictionaries
    dispute_list = []
    for dispute_id, dispute in dispute_data.items():
        # Add the evidence ID to each evidence dictionary
        dispute['id'] = dispute_id
        dispute_list.append(dispute)

    return dispute_list


def email_to_pdf(email_data: Dict[str, str]) -> str:
    """
    Converts email content into a PDF and saves it to the specified file path.

    :param email_data (Dict[str, str]): A dictionary containing the email's content.
            It should include the fields like 'body', 'subject', 'sender', etc.

    :return filename
    """
    pdf = FPDF()
    pdf.add_page()

    # Set font for title
    pdf.add_font('DejaVu', '', 'DejaVuSans.ttf', uni=True)
    pdf.set_font('DejaVu', '', 12)

    pdf.cell(200, 10, f"Subject: {email_data['subject'].encode('ascii', 'ignore').decode()}",
             ln=True, align='C')

    pdf.ln(10)
    pdf.multi_cell(0, 10, f"From: {email_data['sender'].encode('ascii', 'ignore').decode()}")
    pdf.multi_cell(0, 10, f"Body: {email_data['body']}")

    # Save the PDF to the specified path
    filename = str(uuid.uuid4())
    pdf.output(f"./media/{filename}.pdf")
    return filename


def write_dispute_msg_db(msg: str, transaction_id: str) -> bool:
    """Writes the dispute message fighting the chargeback to db
    :param msg dispute message to write
    :param transaction_id of the dispute
    :return boolean of success"""
    ref = db.reference(f'disputes/{transaction_id}')
    ref.update({msg: msg})
    return True


write_dispute_to_firebase_func = FunctionTool.from_defaults(fn=write_dispute_to_firebase)
add_evidence_to_dispute_db_func = FunctionTool.from_defaults(fn=add_evidence_to_dispute_db)
get_evidence_of_dispute_db_func = FunctionTool.from_defaults(fn=get_evidence_of_dispute_db)
get_dispute_db_func = FunctionTool.from_defaults(fn=get_dispute_db)
email_to_pdf_func = FunctionTool.from_defaults(fn=email_to_pdf)

# initialize llm
llm = OpenAI(model="gpt-4o")


# initialize ReAct agent


def check_dispute():
    agent = ReActAgent.from_tools(
        [
            write_dispute_to_firebase_func,
        ],
        llm=llm,
        verbose=True,
        max_iterations=10,
    )
    emails = run_email()
    for email in emails:
        email_content = f"""
                    email body: {email['content']}
                    email attachments: {email['attachments']}
                    email sender: {email['sender']}
                    email subject: {email['subject']}
                    Based on the email above, do one of the following tasks:
                    1. If it is an email about a chargeback dispute, save it to the database under disputes.
                    Look through sources and find evidence that can be used for the chargeback dispute and update the database under disputes.
                    2. If it is an email with evidence concerning a chargeback dispute such as delivery or invoice, do nothing
                    """
        agent.chat(email_content)
        agent.reset()


""""""


def check_evidence():
    agent = ReActAgent.from_tools(
        [
            add_evidence_to_dispute_db_func,
            get_evidence_of_dispute_db_func,
            get_dispute_db_func,
            email_to_pdf_func
        ],
        llm=llm,
        verbose=True,
        max_iterations=10,
    )
    emails = run_email()
    for email in emails:
        email_content = f"""
                        email body: {email['content']}
                        email attachments: {email['attachments']}
                        email sender: {email['sender']}
                        email subject: {email['subject']}
                        Based on the email above, do one of the following tasks:
                        1. If it is an email about a chargeback dispute from a bank or official source, ignore. 
                        2. If it is an email that could be used as evidence for a chargeback dispute such as delivery,
                        check if it fits under any of the existing disputes, if so,  
                        check if it doesn't already exist under the matching dispute, 
                        and if it is a new evidence, 
                        convert the email to pdf, 
                        and save it under sources/transaction_id.
                        """
        agent.chat(email_content)
        agent.reset()


def get_dispute_msgs():
    agent = ReActAgent.from_tools(
        [

        ],
        llm=llm,
        verbose=True,
        max_iterations=10,
    )
    ref = db.reference(f'disputes')

    # Get the evidence data from the database
    dispute_data = ref.get()

    # Check if evidence_data is None (i.e., no evidence exists)
    if dispute_data is None:
        print(f"No data found for disputes.")
        return []

    # Convert the evidence data to a list of dictionaries
    for dispute_id, dispute in dispute_data.items():
        email_content = f"""
                            transaction id: {dispute_id}
                            information: {dispute}
                            Based on the dispute above, generate a message fighting the chargebacks based on evidence provided and save it to dispute. 
                            """
        agent.chat(email_content)
        agent.reset()

check_dispute()
check_evidence()
get_dispute_msgs()
