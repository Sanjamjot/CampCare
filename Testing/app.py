from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory users dictionary for testing
users = {}

# Registration route
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    phone = data.get('phone')
    password = data.get('password')

    # Check if user already exists
    if phone in users:
        return jsonify({"message": "User already exists"}), 400

    # Register the new user
    users[phone] = password
    return jsonify({"message": "Registration successful"}), 201

# Login route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    phone = data.get('phone')
    password = data.get('password')

    # Check if user exists
    if phone not in users:
        return jsonify({"message": "User not found"}), 404

    # Check if password matches
    if users[phone] != password:
        return jsonify({"message": "Invalid credentials"}), 401

    # Successful login
    return jsonify({"message": "Login successful", "token": "your-token-here"}), 200

if __name__ == '__main__':
    app.run(debug=True)
