// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    //on submit, add task to local storage
    // get information from form and save it
    const newTask = {
         title: document.getElementById("task-title").value,
         date: document.getElementById("task-due-date").value,
         description: document.getElementById("description").value
    }
    // add new task to existing list
    // stringify the list

    // draggable/droppable
    // updating status of progress
    // deleting a task


    localStorage.setItem("tasks", JSON.stringify(newTask))
    //call rendertasklist to refresh list
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    document.querySelector("#formModal form").addEventListener("submit", handleAddTask)
});

