from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["student_db"]
students = db["students"]

@app.route("/")
def login_page():
    return render_template("loginpg.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/login", methods=["POST"])
def login():
    
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if email == "admin@gmail.com" and password == "1234":
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(debug=True)