// Get the task list element
const taskList = document.getElementById("taskList");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask('${task}')">Delete</button>
        `;
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim(); //to remove extra spaces
  if (task !== "") {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
  }
}

// Function to delete a task
function deleteTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.indexOf(task);
  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}
// Function to edit a task
// Function to edit a task
function editTask(oldTask, newTask) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from local storage
    const index = tasks.indexOf(oldTask); // Find the index of the old task
    if (index !== -1 && newTask.trim() !== '') { // Check if the old task exists and new task is not empty
        tasks[index] = newTask.trim(); // Replace the old task with the new task
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update the tasks in local storage
        loadTasks(); // Reload the task list
    }
}

// Function to handle editing task
function handleEdit(li, task) {
    const input = document.createElement('input'); // Create an input element
    input.type = 'text'; // Set input type to text
    input.value = task; // Set the initial value of the input to the task text
    input.addEventListener('keyup', function(event) { // Add event listener for keyup event
        if (event.key === 'Enter') { // Check if Enter key is pressed
            editTask(task, input.value); // Call editTask function to save changes
        }
    });
    li.innerHTML = ''; // Clear the content of the list item
    li.appendChild(input); // Append the input element to the list item
    input.focus(); // Set focus on the input element
}

// Function to load tasks from local storage when the page loads
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from local storage
    taskList.innerHTML = ''; // Clear the task list
    tasks.forEach(task => { // Loop through each task
        const li = document.createElement('li'); // Create a list item element
        li.innerHTML = `
            <span>${task}</span> <!-- Display the task text -->
            <button class="edit-btn" onclick="handleEdit(this.parentElement, '${task}')">Edit</button> <!-- Button to edit task -->
            <button onclick="deleteTask('${task}')">Delete</button> <!-- Button to delete task -->
        `;
        taskList.appendChild(li); // Append the list item to the task list
    });
}

