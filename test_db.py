from db import students_collection

students = {
    "name": "rajesh",
    "age": 21,
    "course": "python"
}

students_collection.insert_one(students)

print("Student data inserted successfully!")