import PIL
from llama_index.core.tools import FunctionTool
from llama_index.llms.openai import OpenAI
from llama_index.core.agent import ReActAgent
from typing import List, Dict, Any, Annotated
import difflib
import subprocess
from get_emails import run_email
from fastapi import FastAPI
from fastapi import WebSocket
from fastapi import WebSocketDisconnect
from llama_index.core import set_global_handler
import sys
import asyncio
from contextlib import redirect_stdout
from io import StringIO

# Function to capture output in real-time
class CapturingOutput(StringIO):
    def __init__(self, websocket=None):
        super().__init__()
        self.websocket = websocket

    def write(self, s):
        super().write(s)
        # Send output to WebSocket in real-time
        if self.websocket:
            asyncio.create_task(self.websocket.send_text(s.strip()))

todos = []
"""
get_fields_function = FunctionTool.from_defaults(fn=get_fields)
get_data_function = FunctionTool.from_defaults(fn=get_data)
fill_pdf_function = FunctionTool.from_defaults(fn=fill_pdf)
open_pdf_function = FunctionTool.from_defaults(fn=open_pdf)
add_todo_function = FunctionTool.from_defaults(fn=add_todo)
images_to_pdf_function = FunctionTool.from_defaults(fn=images_to_pdf)
get_fields_from_image_function = FunctionTool.from_defaults(fn=get_fields_from_image)
fill_pdf_via_image_function = FunctionTool.from_defaults(fn=fill_pdf_via_image)
read_pull_function = FunctionTool.from_defaults(fn=read_pull)
find_commit_sha_by_code_segment_function = FunctionTool.from_defaults(
    fn=find_commit_sha_by_code_segment
)
post_comment_to_pr_function = FunctionTool.from_defaults(fn=post_comment_to_pr)
prioritize_emails_to_todoist_function = FunctionTool.from_defaults(
    fn=prioritize_emails_to_todoist
)
schedule_meeting_function = FunctionTool.from_defaults(fn=schedule_meeting)
"""

# initialize llm
llm = OpenAI(model="gpt-4o")

# initialize ReAct agent
agent = ReActAgent.from_tools(
    [
    ],
    llm=llm,
    verbose=True,
    max_iterations=10,
)

# app = FastAPI()

# Store connected clients in a list
# clients = []

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     clients.append(websocket)
#     try:
#         await websocket.send_text("Worker 1 has started...")
#         emails = run_email()
#
#         # Start the email processing with WebSocket logging
#         await process_emails(agent, emails, websocket)
#     except WebSocketDisconnect:
#         clients.remove(websocket)
#         print("Client disconnected")


# Function to broadcast logs to all connected WebSocket clients
# async def broadcast_log(log_message: str):
#     for client in clients:
#         await client.send_text(log_message)


# async def process_emails(agent, emails, websocket):
#     for email in emails:
#         try:
#             await broadcast_log(f"Processing email from {email['sender']}")
#             email_content = f"""
#                         email body: {email['content']}
#                         email attachments: {email['attachments']}
#                         email sender: {email['sender']}
#                         email subject: {email['subject']}
#                         Based on the email above, do one of the following tasks:
#                         1. Download the attachment, fill out the pdf with appropriate function (if there's no fields use image-related functions), and open the edited version.
#                         2. Add the email as a dictionary to the todo list. Dictionary should have the following keys: subject, sender, snippet, due_date. Summarize the body.
#                         3. Schedule a meeting with the sender of the email if the email has timeslots instead of todo tasks.
#                         4. Review the pull-request and suggest any changes to make before merging. Write code suggestions to GitHub as a comment.
#                         """
#             # Redirect stdout to capture agent's output in real-time
#             with CapturingOutput(websocket=websocket) as output_buffer:
#                 with redirect_stdout(output_buffer):
#                     # Run the agent and capture output in real-time
#                     agent.chat(email_content)
#         except Exception as e:
#             await websocket.send_text(f"Error processing email: {str(e)}")

emails = run_email()
for email in emails:
    email_content = f"""
                email body: {email['content']}
                email attachments: {email['attachments']}
                email sender: {email['sender']}
                email subject: {email['subject']}
                Based on the email above, do one of the following tasks:
                1. Download the attachment, fill out the pdf with appropriate function (if there's no fields use image-related functions), and open the edited version.
                2. Add the email as a dictionary to the todo list. Dictionary should have the following keys: subject, sender, snippet, due_date. Summarize the body.
                3. Schedule a meeting with the sender of the email if the email has timeslots instead of todo tasks.
                4. Review the pull-request and suggest any changes to make before merging. Write code suggestions to GitHub as a comment.
                """
    agent.chat(email_content)
