// Function to toggle the attendance form
function toggleForm() {
  var formContainer = document.getElementById("attendance-form-container");
  var expandBtn = document.getElementById("expand-btn");

  if (formContainer.style.display === "none") {
    formContainer.style.display = "block";
    expandBtn.textContent = "Collapse";
  } else {
    formContainer.style.display = "none";
    expandBtn.textContent = "Expand";
  }
}

// Function to handle form submission
function markAttendance(event) {
  event.preventDefault();

  // Get form values
  var rollNo = document.getElementById("roll-no").value;
  var studentName = document.getElementById("student-name").value;
  var date = document.getElementById("date").value;

  // Create table row
  var table = document.getElementById("attendance-table");
  var row = table.insertRow(-1);
  var rollNoCell = row.insertCell(0);
  var nameCell = row.insertCell(1);
  var dateCell = row.insertCell(2);

  // Set cell values
  rollNoCell.textContent = rollNo;
  nameCell.textContent = studentName;
  dateCell.textContent = date;

  // Clear form inputs
  document.getElementById("roll-no").value = "";
  document.getElementById("student-name").value = "";
  document.getElementById("date").value = "";

  // Hide the form
  var formContainer = document.getElementById("attendance-form-container");
  formContainer.style.display = "none";
  document.getElementById("expand-btn").textContent = "Expand";

  // Store attendance data in local storage
  var attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
  attendanceData.push({ rollNo: rollNo, name: studentName, date: date });
  localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
}

// Function to load attendance data from local storage
function loadAttendanceData() {
  var attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
  var table = document.getElementById("attendance-table");

  attendanceData.forEach(function (data) {
    var row = table.insertRow(-1);
    var rollNoCell = row.insertCell(0);
    var nameCell = row.insertCell(1);
    var dateCell = row.insertCell(2);

    rollNoCell.textContent = data.rollNo;
    nameCell.textContent = data.name;
    dateCell.textContent = data.date;
  });
}

// Attach event listener to form submission
var attendanceForm = document.getElementById("attendance-form");
attendanceForm.addEventListener("submit", markAttendance);

// Load attendance data on page load
loadAttendanceData();
