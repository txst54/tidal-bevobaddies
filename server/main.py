from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"

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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
