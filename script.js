document.addEventListener("DOMContentLoaded", function () {

    const taskList = document.getElementById("taskList");
    const taskInput = document.getElementById("taskInput");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function (task, index) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button data-index="${index}" class="editTaskButton">Edit</button>
                <button data-index="${index}" class="deleteTaskButton">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            taskInput.value = "";
        }
    }

    function editTask(index, newTaskText) {
        tasks[index] = newTaskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    document.getElementById("addTaskButton").addEventListener("click", addTask);

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("editTaskButton")) {
            const index = e.target.getAttribute("data-index");
            const newTaskText = prompt("Edit the task:", tasks[index]);
            if (newTaskText !== null) {
                editTask(index, newTaskText);
            }
        }
    });

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("deleteTaskButton")) {
            const index = e.target.getAttribute("data-index");
            if (confirm("Are you sure you want to delete this task?")) {
                deleteTask(index);
            }
        }
    });

    renderTasks();
});
