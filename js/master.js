// Setting up variables
let theInput = document.querySelector(".add-task input"),
  theAddButton = document.querySelector(".add-task .plus"),
  tasksContainer = document.querySelector(".tasks-content"),
  tasksCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-completed span");

// Focus on input field
window.onload = function () {
  theInput.focus();
};

// Adding the task
theAddButton.onclick = function () {
  // Check if input is empty or not
  if (theInput.value !== "") {
    let noTasksMsg = document.querySelector(".no-tasks-message");

    // Check if span with no tasks message if exist
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      // Remove no tasks message
      noTasksMsg.remove();
    }

    // Create main span element
    let mainSpan = document.createElement("span");

    // Create delete button
    let deleteElement = document.createElement("span");

    // Create the main span text
    let text = document.createTextNode(theInput.value);

    // Create the delete button text
    let deleteText = document.createTextNode("Delete");

    // Add text to main span
    mainSpan.appendChild(text);

    // Add class to main span
    mainSpan.className = "task-box";

    // Add text to delete button
    deleteElement.appendChild(deleteText);

    // Add class to delete button
    deleteElement.className = "delete";

    // Add delete button to main span
    mainSpan.appendChild(deleteElement);

    // Add the task to container
    tasksContainer.appendChild(mainSpan);

    // Empty the input
    theInput.value = "";

    // Focus on field
    theInput.focus();

    // Calculate tasks
    calculateTasks();
  }
};

document.addEventListener("click", (e) => {
  // Delete task
  if (e.target.className == "delete") {
    // Remove current task
    e.target.parentNode.remove();

    // Check number of tasks inside the container
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
  }

  // Finish task
  if (e.target.classList.contains("task-box")) {
    // Toggle class 'finished'
    e.target.classList.toggle("finished");
  }

  // Calculate Tasks
  calculateTasks();
});

// Function to create no tasks message
function createNoTasks() {
  // Create message span element
  let msgSpan = document.createElement("span");

  // Create the test message
  let msgText = document.createTextNode("No tasks to show");

  // Add text to message span element
  msgSpan.appendChild(msgText);

  // add class to message span
  msgSpan.className = "no-task-message";

  // Append the message span element to the task container
  tasksContainer.appendChild(msgSpan);
}

// Function to calculate tasks
function calculateTasks() {
  // Calculate all tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // Calculate completed tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}
