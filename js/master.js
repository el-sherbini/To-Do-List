let taskTxt = document.querySelector(".add-task .task-text"),
  addBtn = document.querySelector(".add-task .plus"),
  tasksContainer = document.querySelector(".tasks-container"),
  tasksCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-completed span"),
  tasksArr = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

// Set tasks to localStorage
localStorage.setItem("tasks", JSON.stringify(tasksArr));

// Get tasks from localStorage
const tasksData = JSON.parse(localStorage.getItem("tasks"));

// Focus input onload
window.onload = function () {
  taskTxt.focus();
};

PopulateTasks(tasksArr);

// Fill tasks container with tasks
function PopulateTasks(tasksArr) {
  tasksContainer.innerHTML = "";

  tasksArr.forEach((task) => {
    let mainDiv = document.createElement("div");
    mainDiv.className = "task-box";
    mainDiv.setAttribute("data-id", task.id);
    task.completed ? mainDiv.classList.add("done") : null;

    let taskSpan = document.createElement("span");
    taskSpan.className = "task-span";
    taskSpan.appendChild(document.createTextNode(task.data));

    let deleteSpan = document.createElement("span");
    deleteSpan.className = "delete";
    deleteSpan.appendChild(document.createTextNode("Delete"));

    let dateSpan = document.createElement("span");
    dateSpan.className = "task-date";

    let date = new Date(task.id);
    dateSpan.appendChild(document.createTextNode(date.toDateString()));

    mainDiv.appendChild(taskSpan);
    mainDiv.appendChild(deleteSpan);
    mainDiv.appendChild(dateSpan);

    tasksContainer.appendChild(mainDiv);
  });

  let noTasksMsg = document.querySelector(".no-tasks-message");

  if (document.body.contains(noTasksMsg)) {
    noTasksMsg.remove();
  }

  calculateTasks();
}

// Add new task
addBtn.onclick = function () {
  if (taskTxt.value !== "") {
    addTaskToArray(taskTxt.value);
    taskTxt.value = "";
  }
  calculateTasks();
};

// Add new task to array
function addTaskToArray(taskTxt) {
  const task = {
    id: Date.now(),
    data: taskTxt,
    completed: false,
  };
  tasksArr.push(task);
  PopulateTasks(tasksArr);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

// Click addBtn when enter is pressed
taskTxt.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// Toggle task status
tasksContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
  } else if (e.target.classList.contains("task-box")) {
    toggleStatusTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
  calculateTasks();
});

// Delete task
function deleteTask(taskId) {
  tasksArr = tasksArr.filter((task) => task.id != taskId);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

// Check task status
function toggleStatusTask(taskId) {
  for (let i = 0; i < tasksArr.length; i++) {
    if (tasksArr[i].id == taskId) {
      tasksArr[i].completed == false
        ? (tasksArr[i].completed = true)
        : (tasksArr[i].completed = false);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

//
function createNoTasks() {
  let msgDiv = document.createElement("div"),
    msgText = document.createTextNode("No tasks to show");

  msgDiv.appendChild(msgText);
  msgDiv.className = "no-tasks-message";

  tasksContainer.appendChild(msgDiv);
}

// Calculate tasks and completed tasks
function calculateTasks() {
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-container .task-box"
  ).length;

  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-container .task-box.done"
  ).length;
}
