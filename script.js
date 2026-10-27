




const students = [
    { id: 1, name: "Amina Rahimi", course: "JavaScript", score: 85 },
    { id: 2, name: "Farid Ahmad", course: "HTML & CSS", score: 72 },
    { id: 3, name: "Laila Noori", course: "Python", score: 93 },
    { id: 4, name: "Omar Khan", course: "JavaScript", score: 42 },
    { id: 5, name: "Maryam Ali", course: "Data Analysis", score: 48 }
];

// Select HTML elements
const studentForm = document.querySelector("#student-form");
const nameInput = document.querySelector("#student-name");
const courseInput = document.querySelector("#course-name");
const scoreInput = document.querySelector("#student-score");

const tableBody = document.querySelector("#student-table-body");
const formMessage = document.querySelector("#form-message");

const totalStudentsElement = document.querySelector("#total-students");
const passedStudentsElement = document.querySelector("#passed-students");
const failedStudentsElement = document.querySelector("#failed-students");
const averageScoreElement = document.querySelector("#average-score");
const studentCountLabel = document.querySelector("#student-count-label");




function renderStudents() {
    // Clear the existing table rows
    tableBody.innerHTML = "";

    // Loop through every student
    students.forEach(function (student) {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const courseCell = document.createElement("td");
        const scoreCell = document.createElement("td");
        const statusCell = document.createElement("td");

        // Display student information
        idCell.textContent = student.id;
        nameCell.textContent = student.name;
        courseCell.textContent = student.course;
        scoreCell.textContent = student.score;

        // Determine pass or fail
        if (student.score >= 50) {
            statusCell.textContent = "Passed";
            statusCell.className = "status-passed";
        } else {
            statusCell.textContent = "Failed";
            statusCell.className = "status-failed";
        }

        // Add cells to the row
        row.append(idCell, nameCell, courseCell, scoreCell, statusCell);

        // Add the row to the table
        tableBody.appendChild(row);
    });

    // Update the number of displayed students
    studentCountLabel.textContent =
        `Showing ${students.length} students`;
}




function validateStudent(name, course, score) {
    if (name.trim() === "") {
        return "Please enter the student's name.";
    }

    if (course.trim() === "") {
        return "Please enter the course name.";
    }

    if (score === "" || !Number.isFinite(Number(score))) {
        return "Please enter a valid numeric score.";
    }

    const numericScore = Number(score);

    if (numericScore < 0 || numericScore > 100) {
        return "Score must be between 0 and 100.";
    }

    return "";
}




studentForm.addEventListener("submit", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get values from the form
    const name = nameInput.value.trim();
    const course = courseInput.value.trim();
    const score = scoreInput.value;

    // Validate the entered information
    const errorMessage = validateStudent(name, course, score);

    if (errorMessage !== "") {
        formMessage.textContent = errorMessage;
        formMessage.style.color = "#DC2626";
        return;
    }

    // Create a new student object
    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,
        name: name,
        course: course,
        score: Number(score)
    };

    // Add the new object to the array
    students.push(newStudent);

    // Refresh the table and summary
    renderStudents();
    updateSummary();

    // Show success message
    formMessage.textContent = "Student added successfully!";
    formMessage.style.color = "#059669";

    // Clear the form
    studentForm.reset();
});




function updateSummary() {
    // Total number of students
    const total = students.length;

    // Count students who passed
    const passed = students.filter(function (student) {
        return student.score >= 50;
    }).length;

    // Count students who failed
    const failed = students.filter(function (student) {
        return student.score < 50;
    }).length;

    // Calculate average score
    const totalScore = students.reduce(function (sum, student) {
        return sum + student.score;
    }, 0);

    const average = total > 0 ? totalScore / total : 0;

    // Display the results in the dashboard
    totalStudentsElement.textContent = total;
    passedStudentsElement.textContent = passed;
    failedStudentsElement.textContent = failed;
    averageScoreElement.textContent = average.toFixed(1);
}




// Extract properties from a student object
const { name, course, score } = students[0];

console.log("Destructuring example:");
console.log(name, course, score);




// Copy a student object and update the copied score
const originalStudent = students[0];

const updatedStudent = {
    ...originalStudent,
    score: 95
};

// Compare the original and copied objects
console.log("Original student:", originalStudent);
console.log("Updated copy:", updatedStudent);




// Display initial records and statistics
renderStudents();
updateSummary();
