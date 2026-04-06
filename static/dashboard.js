const API_URL = "http://127.0.0.1:5000/students";

async function loadStudents() {

    const response = await fetch(API_URL);
    const students = await response.json();

    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((s, i) => {

        table.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>${s.course}</td>

            <td>
                <button class="delete" onclick="deleteStudent('${s._id}')">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("studentCount").innerText = students.length;
}

function openForm() {
    document.getElementById("studentForm").style.display = "block";
}

function closeForm() {
    document.getElementById("studentForm").style.display = "none";
}

window.onload = loadStudents;