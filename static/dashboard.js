let students = []

function renderStudents() {
    let table = document.getElementById("studentTable")
    table.innerHTML = ""
    students.forEach((s, i) => {
        table.innerHTML += `
<tr>

<td>${i + 1}</td>
<td>${s.name}</td>
<td>${s.age}</td>
<td>${s.course}</td>

<td>

<button class="edit">Edit</button>
<button class="delete" onclick="deleteStudent(${i})">Delete</button>

</td>
</tr>
`
    })
    document.getElementById("studentCount").innerText = students.length
}

function openForm() {
    document.getElementById("studentForm").style.display = "block"
}

function closeForm() {
    document.getElementById("studentForm").style.display = "none"
}

function addStudent() {
    let name = document.getElementById("name").value
    let age = document.getElementById("age").value
    let course = document.getElementById("course").value
    students.push({ name, age, course })
    renderStudents()
    closeForm()
}

function deleteStudent(i) {
    students.splice(i, 1)
    renderStudents()
}