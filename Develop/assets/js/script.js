// LAST TO-DOs
// Display them on the page (in a list or similar format).
// make draggable
// make droppable

dayjs.locale('en');

// Retrieve tasks from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("card", "mb-2");
    taskCard.setAttribute("draggable", "true");
    taskCard.setAttribute("data-task-id", task.id);
    
    const formattedDate = dayjs(task.date).format('YYYY-MM-DD');

    taskCard.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text"><small class="text-muted">Due: ${formattedDate}</small></p>
            <button class="btn btn-danger btn-sm" onclick="handleDeleteTask('${task.id}')">Remove Task</button>
        </div>
    `;

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const taskListContainer = document.getElementById("task-list");
    taskListContainer.innerHTML = "";

    taskList.forEach((task) => {
        const taskCard = createTaskCard(task);
        taskListContainer.appendChild(taskCard);

        $(taskCard).draggable({
            revert: "invalid",
            helper: "clone",
            start: function(event, ui) {
                ui.helper.css("opacity", "0.5");
            }
        });
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const newTask = {
        id: generateTaskId(),
        title: document.getElementById("task-title").value,
        date: dayjs(document.getElementById("task-due-date").value).format('YYYY-MM-DD'),
        description: document.getElementById("description").value
    };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList(); // Render updated task list
    $("#formModal").modal("hide");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(taskId) {
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    event.preventDefault();

    const taskId = ui.draggable.data("task-id");
    const task = taskList.find(t => t.id === taskId);
    const newLaneId = event.target.id;

    if (task) {
        task.status = newLaneId;
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
    }
}

function handleDragOver(event) {
    event.preventDefault();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $(".task-lane").on("drop", handleDrop);
    $(".task-lane").on("dragover", handleDragOver);
    $("#formModal form").on("submit", handleAddTask);

    $(".task-lane").droppable({
        accept: ".task-card",
        drop: handleDrop
    });

    $("#task-due-date").datepicker();
});
