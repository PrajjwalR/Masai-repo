const readline = require('readline');
const fs = require('fs');
const filePath = './tasks.json';

let tasks = [];

if (fs.existsSync(filePath)) {
  tasks = JSON.parse(fs.readFileSync(filePath));
}

function saveTasks() {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showWelcome() {
  console.log(' Welcome to Terminal Task Manager!');
  console.log('Type `help` to see available commands.');
  promptUser();
}

function promptUser() {
  rl.question('\n Enter command: ', (command) => {
    switch (command.trim()) {
      case 'add-task':
        handleAddTask();
        break;
      case 'list-tasks':
        handleListTasks();
        break;
      case 'complete-task':
        handleCompleteTask();
        break;
      case 'update-task':
        handleUpdateTask();
        break;
      case 'delete-task':
        handleDeleteTask();
        break;
      case 'search-tasks':
        handleSearchTasks();
        break;
      case 'help':
        showHelp();
        break;
      case 'exit':
        console.log(' Goodbye!');
        rl.close();
        break;
      default:
        console.log(' Unknown command. Type `help` to see available commands.');
        promptUser();
    }
  });
}

// TASK HANDLERS 

function handleAddTask() {
  rl.question(' Task title: ', (title) => {
    if (!title.trim()) return showError('Title cannot be empty');

    rl.question(' Due date (YYYY-MM-DD): ', (dueDate) => {
      if (!dueDate.trim()) return showError('Due date cannot be empty');

      const task = {
        id: Date.now(),
        title,
        dueDate,
        status: 'pending',
      };
      tasks.push(task);
      saveTasks();
      console.log(` Task "${title}" added.`);
      promptUser();
    });
  });
}

function handleListTasks() {
  if (tasks.length === 0) {
    console.log(' No tasks found.');
  } else {
    console.log('\n All Tasks:');
    tasks.forEach((task, index) => {
      console.log(
        `${index + 1}. [${task.status.toUpperCase()}] ID: ${task.id} - "${task.title}" (Due: ${task.dueDate})`
      );
    });
  }
  promptUser();
}

function handleCompleteTask() {
  rl.question(' Enter task ID or title to mark complete: ', (input) => {
    const task = findTask(input);
    if (!task) return showError('Task not found');

    if (task.status === 'completed') {
      console.log('ℹ Task is already completed.');
    } else {
      task.status = 'completed';
      saveTasks();
      console.log(` Task "${task.title}" marked as completed.`);
    }
    promptUser();
  });
}

function handleUpdateTask() {
  rl.question('Enter task ID or title to update: ', (input) => {
    const task = findTask(input);
    if (!task) return showError('Task not found');

    rl.question(`New title (press enter to skip): `, (newTitle) => {
      rl.question(`New due date (YYYY-MM-DD, press enter to skip): `, (newDate) => {
        if (!newTitle && !newDate) {
          console.log(' Nothing to update.');
        } else {
          if (newTitle.trim()) task.title = newTitle.trim();
          if (newDate.trim()) task.dueDate = newDate.trim();
          saveTasks();
          console.log(`Task "${task.title}" updated.`);
        }
        promptUser();
      });
    });
  });
}

function handleDeleteTask() {
  rl.question('Enter task ID or title to delete: ', (input) => {
    const index = tasks.findIndex(
      (t) => t.id.toString() === input.trim() || t.title === input.trim()
    );
    if (index === -1) return showError('Task not found');

    const removed = tasks.splice(index, 1);
    saveTasks();
    console.log(` Task "${removed[0].title}" deleted.`);
    promptUser();
  });
}

function handleSearchTasks() {
  rl.question(' Enter keyword or date to search: ', (query) => {
    const matches = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.dueDate === query.trim()
    );
    if (matches.length === 0) {
      console.log(' No matching tasks found.');
    } else {
      console.log(`\n Matching Tasks (${matches.length}):`);
      matches.forEach((task, index) => {
        console.log(
          `${index + 1}. [${task.status.toUpperCase()}] ID: ${task.id} - "${task.title}" (Due: ${task.dueDate})`
        );
      });
    }
    promptUser();
  });
}

// HELP & UTIL 

function showHelp() {
  console.log('\ Available Commands:');
  console.log('- add-task       ➤ Add a new task');
  console.log('- list-tasks     ➤ List all tasks');
  console.log('- complete-task  ➤ Mark a task as completed');
  console.log('- update-task    ➤ Update a task title or due date');
  console.log('- delete-task    ➤ Delete a task');
  console.log('- search-tasks   ➤ Search tasks by title or due date');
  console.log('- help           ➤ Show this help menu');
  console.log('- exit           ➤ Exit the application');
  promptUser();
}

function findTask(input) {
  return tasks.find(
    (t) => t.id.toString() === input.trim() || t.title === input.trim()
  );
}

function showError(message) {
  console.log(`${message}`);
  promptUser();
}

// Start
showWelcome();
