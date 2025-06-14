const fs = require('fs');
const readline = require('readline');
const path = require('path');

const TASKS_FILE = './tasks.json';
const PREF_FILE = './preferences.json';

let tasks = [];
let preferences = { show: 'all' }; // 'all' | 'completed' | 'pending'

// Load Tasks
if (fs.existsSync(TASKS_FILE)) {
  tasks = JSON.parse(fs.readFileSync(TASKS_FILE));
}

// Load Preferences
if (fs.existsSync(PREF_FILE)) {
  preferences = JSON.parse(fs.readFileSync(PREF_FILE));
}

// Save Tasks
function saveTasks() {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Save Preferences
function savePreferences() {
  fs.writeFileSync(PREF_FILE, JSON.stringify(preferences, null, 2));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showWelcome() {
  console.log('Terminal Task Manager (Advanced Version)');
  console.log('Type `help` for command list.');
  promptUser();
}

function promptUser() {
  rl.question('\nEnter command: ', (command) => {
    switch (command.trim()) {
      case 'add-task': return handleAddTask();
      case 'list-tasks': return handleListTasks();
      case 'complete-task': return handleCompleteTask();
      case 'update-task': return handleUpdateTask();
      case 'delete-task': return handleDeleteTask();
      case 'search-tasks': return handleSearchTasks();
      case 'set-preference': return handleSetPreference();
      case 'help': return showHelp();
      case 'exit':
        console.log('Exiting...');
        rl.close();
        break;
      default:
        console.log('Invalid command. Type `help` for available options.');
        promptUser();
    }
  });
}

// ---------- Input Validation ----------
function isValidDate(dateStr) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(Date.parse(dateStr));
}

function findTask(input) {
  return tasks.find(
    (t) => t.id.toString() === input.trim() || t.title.toLowerCase() === input.trim().toLowerCase()
  );
}

function showError(message) {
  console.log(`Error: ${message}`);
  promptUser();
}

// ---------- Commands ----------

function handleAddTask() {
  rl.question('Task Title: ', (title) => {
    if (!title.trim()) return showError('Task title cannot be empty.');

    rl.question('Due Date (YYYY-MM-DD): ', (dueDate) => {
      if (!isValidDate(dueDate)) return showError('Invalid due date format.');

      const task = {
        id: Date.now(),
        title: title.trim(),
        dueDate: dueDate,
        status: 'pending',
      };
      tasks.push(task);
      saveTasks();
      console.log(`Task "${task.title}" added.`);
      promptUser();
    });
  });
}

function handleListTasks() {
  let filteredTasks = tasks;

  if (preferences.show === 'completed') {
    filteredTasks = tasks.filter(t => t.status === 'completed');
  } else if (preferences.show === 'pending') {
    filteredTasks = tasks.filter(t => t.status === 'pending');
  }

  if (filteredTasks.length === 0) {
    console.log('No tasks to show.');
  } else {
    filteredTasks.forEach((t, i) => {
      console.log(`${i + 1}. [${t.status.toUpperCase()}] ID: ${t.id} - ${t.title} (Due: ${t.dueDate})`);
    });
  }

  promptUser();
}

function handleCompleteTask() {
  rl.question('Enter Task ID or Title to mark as completed: ', (input) => {
    const task = findTask(input);
    if (!task) return showError('Task not found.');
    if (task.status === 'completed') {
      console.log('Task is already completed.');
    } else {
      task.status = 'completed';
      saveTasks();
      console.log(`Task "${task.title}" marked as completed.`);
    }
    promptUser();
  });
}

function handleUpdateTask() {
  rl.question('Enter Task ID or Title to update: ', (input) => {
    const task = findTask(input);
    if (!task) return showError('Task not found.');

    rl.question('New Title (press enter to skip): ', (newTitle) => {
      rl.question('New Due Date (YYYY-MM-DD, press enter to skip): ', (newDate) => {
        if (!newTitle && !newDate) {
          console.log('Nothing to update.');
        } else {
          if (newTitle.trim()) task.title = newTitle.trim();
          if (newDate.trim()) {
            if (!isValidDate(newDate)) return showError('Invalid date format.');
            task.dueDate = newDate;
          }
          saveTasks();
          console.log(`Task "${task.title}" updated.`);
        }
        promptUser();
      });
    });
  });
}

function handleDeleteTask() {
  rl.question('Enter Task ID or Title to delete: ', (input) => {
    const index = tasks.findIndex(
      (t) => t.id.toString() === input.trim() || t.title.toLowerCase() === input.trim().toLowerCase()
    );
    if (index === -1) return showError('Task not found.');

    const removed = tasks.splice(index, 1);
    saveTasks();
    console.log(`Task "${removed[0].title}" deleted.`);
    promptUser();
  });
}

function handleSearchTasks() {
  rl.question('Search by keyword or date (YYYY-MM-DD): ', (query) => {
    const matches = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.dueDate === query.trim()
    );
    if (matches.length === 0) {
      console.log('No tasks found.');
    } else {
      matches.forEach((t, i) => {
        console.log(`${i + 1}. [${t.status.toUpperCase()}] ID: ${t.id} - ${t.title} (Due: ${t.dueDate})`);
      });
    }
    promptUser();
  });
}

function handleSetPreference() {
  rl.question('Set preference (all / completed / pending): ', (choice) => {
    const valid = ['all', 'completed', 'pending'];
    if (!valid.includes(choice)) return showError('Invalid preference value.');
    preferences.show = choice;
    savePreferences();
    console.log(`Preference updated to show "${choice}" tasks.`);
    promptUser();
  });
}

function showHelp() {
  console.log('\nAvailable Commands:');
  console.log('- add-task        : Add a new task');
  console.log('- list-tasks      : List tasks (filtered by preference)');
  console.log('- complete-task   : Mark task as completed');
  console.log('- update-task     : Update task title or due date');
  console.log('- delete-task     : Delete a task');
  console.log('- search-tasks    : Search tasks by title or due date');
  console.log('- set-preference  : Set filter for list-tasks (all/completed/pending)');
  console.log('- help            : Show help menu');
  console.log('- exit            : Exit the application');
  promptUser();
}

// Start App
showWelcome();
