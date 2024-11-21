// HTML DOM elements
const categoryInput = document.getElementById("category");
const taskInput = document.getElementById("task");
const tasksList = document.getElementById("tasks-list");

// Initialize an object to store tasks by category
const tasksByCategory = {};

// Add a task to the specified category
function addTask() {
  // Take value from input elements
  const category = categoryInput.value.trim();
  const task = taskInput.value.trim();

  // Check if both category and task fields have values
  if (!category || !task) {
    alert("Please enter both category and task.");
    return;
  }

  // Add task to the specified category in tasksByCategory object
  if (!tasksByCategory[category]) {
    tasksByCategory[category] = [];
  }
  tasksByCategory[category].push(task);

  // Clear input fields
  categoryInput.value = "";
  taskInput.value = "";

  // Refresh displayed tasks
  listTasks();
}

// Display all tasks by category
function listTasks() {
  // Clear previous tasks
  tasksList.innerHTML = "";

  // List all tasks by category
  for (const category in tasksByCategory) {
    // Create a div for each category
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";

    // Create and append a header for the category
    const categoryHeader = document.createElement("h3");
    categoryHeader.textContent = category;
    categoryDiv.appendChild(categoryHeader);

    // List each task in the category
    tasksByCategory[category].forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";

      const taskText = document.createElement("span");
      taskText.textContent = task;

      // Create a remove button for each task
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = () => removeTask(category, index);

      // Append task and remove button to task div
      taskDiv.appendChild(taskText);
      taskDiv.appendChild(removeButton);

      // Append task div to category div
      categoryDiv.appendChild(taskDiv);
    });

    // Append category div to tasksList
    tasksList.appendChild(categoryDiv);
  }
}

// Remove a task from the specified category
function removeTask(category, taskIndex) {
  // Remove the task from tasksByCategory object
  tasksByCategory[category].splice(taskIndex, 1);

  // If the category is empty after removal, delete the category
  if (tasksByCategory[category].length === 0) {
    delete tasksByCategory[category];
  }

  // Refresh displayed tasks
  listTasks();
}
