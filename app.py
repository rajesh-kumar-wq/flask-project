from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["student_db"]
students = db["students"]

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/service")
def service():
    return render_template("service.html")

@app.route("/students", methods=["POST"])
def create_student():
    data = request.json
    student = {
        "name": data.get("name"),
        "age": data.get("age"),
        "course": data.get("course")
    }
    result = students.insert_one(student)
    return jsonify({
        "message": "Student created successfully",
        "id": str(result.inserted_id)
    })
    
@app.route("/students", methods=["GET"])
def get_students():
    student_list = []
    for student in students.find():
        student["_id"] = str(student["_id"])
        student_list.append(student)
    return jsonify(student_list)

@app.route("/students/<id>", methods=["GET"])
def get_student(id):
    student = students.find_one({"_id": ObjectId(id)})
    if student:
        student["_id"] = str(student["_id"])
        return jsonify(student)
    return jsonify({"error": "Student not found"}), 404

@app.route("/students/<id>", methods=["PUT"])
def update_student(id):
    data = request.json
    result = students.update_one(
        {"_id": ObjectId(id)},
        {"$set": data}
    )
    if result.modified_count:
        return jsonify({"message": "Student updated successfully"})
    return jsonify({"message": "No changes made or student not found"}), 404

@app.route("/students/<id>", methods=["DELETE"])
def delete_student(id):
    result = students.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return jsonify({"message": "Student deleted successfully"})
    return jsonify({"error": "Student not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)