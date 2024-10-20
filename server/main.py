from flask import Flask, request, jsonify, send_from_directory
import agent
import os

app = Flask(__name__)
MEDIA_FOLDER = os.path.join(os.getcwd(), 'media')


@app.route('/')
def hello():
    return "Server is running..."


@app.route('/fetch-requests', methods=['GET'])
def fetch_requests():
    # Get any query parameters if needed
    params = request.args

    # For demonstration, let's return the received query parameters
    response = {
        "message": "GET request received successfully",
        "params": params.to_dict()  # Convert the query parameters to a dictionary
    }

    return jsonify(response), 200


@app.route('/media/<path:filename>')
def media_files(filename):
    try:
        return send_from_directory(MEDIA_FOLDER, filename)
    except FileNotFoundError:
        return "File not found", 404


@app.route('/refresh', methods=['GET'])
def refresh_disputes():
    agent.check_dispute()
    agent.check_evidence()

    response = {
        "message": "GET request received successfully",
        "params": {'success': 'ok'}
    }

    return jsonify(response), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
