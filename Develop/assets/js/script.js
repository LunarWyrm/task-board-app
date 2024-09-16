// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));b

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Date.now(+ Math.random().toString(36).substr(2, 9);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // populates the card with information from the task list and formats it
    return `
    <div class="card mb-2" draggable="true" data-id="${task.id}">
        <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small class="text-muted">Due: ${task.date}</small></p>
        <button class="btn btn-danger btn-sm" onclick="handleDeleteTask('${task.id}')">Remove Task</button>
        
        </div>
    </div>`;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // Get the tasks from localStorage.
    const taskListContainer = document.getElementById("task-list");

    // Clears the list to prevent duplicates after refreshing the render
    taskListContainer.innerHTML = "";

    // Create HTML elements for each task.
    taskList.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
        ${task.title} <br>
        ${task.description}
        Due By: ${task.date}
        <button onclick="deleteTask(${index})">Remove Task</button>
        `;
        taskListContainer.appendChild(taskItem);
    });

    // Display them on the page (in a list or similar format).
    // make draggable
    // make droppable
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    // on submit, add task to local storage
    // get information from form and save it
    const newTask = {
        id: generateTaskId(),
        title: document.getElementById("task-title").value,
        date: document.getElementById("task-due-date").value,
        description: document.getElementById("description").value
    }

    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();

    console.log("New Task:", newTask);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    // gets all tasks in the task list, targets the id to be deleted and selects all but that one, saving over the task list without that id
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
// updating status of progress
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    document.querySelector("#formModal form").addEventListener("submit", handleAddTask)
});

