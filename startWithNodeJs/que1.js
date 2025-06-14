const readline = require('readline');
const fs = require('fs');
const filePath = './tasks.json';

let tasks = [];

if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath);
  tasks = JSON.parse(data);
}

function saveTasks() {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showWelcome() {
  console.log('Welcome to Terminal Task Manager!');
  console.log('Available commands:');
  console.log('- add-task');
  console.log('- list-tasks');
  console.log('- complete-task');
  console.log('- exit');
  promptUser();
}

function promptUser() {
  rl.question('\nEnter command: ', (command) => {
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
      case 'exit':
        console.log('Exiting...');
        rl.close();
        break;
      default:
        console.log('Unknown command.');
        promptUser();
    }
  });
}

function handleAddTask() {
  rl.question('Task title: ', (title) => {
    if (!title.trim()) {
      console.log('Title cannot be empty.');
      return promptUser();
    }
    rl.question('Due date (YYYY-MM-DD): ', (dueDate) => {
      if (!dueDate.trim()) {
        console.log('Due date cannot be empty.');
        return promptUser();
      }
      const task = {
        id: Date.now(),
        title,
        dueDate,
        status: 'pending',
      };
      tasks.push(task);
      saveTasks();
      console.log(`Task "${title}" added.`);
      promptUser();
    });
  });
}

// List tasks
function handleListTasks() {
  if (tasks.length === 0) {
    console.log('No tasks found.');
  } else {
    console.log('\n All Tasks:');
    tasks.forEach((task, index) => {
      console.log(
        `${index + 1}. [${task.status.toUpperCase()}] "${task.title}" - Due: ${task.dueDate}`
      );
    });
  }
  promptUser();
}

// Complete task
function handleCompleteTask() {
  rl.question('Enter task title or ID to mark complete: ', (input) => {
    const task = tasks.find(
      (t) => t.id.toString() === input.trim() || t.title === input.trim()
    );

    if (!task) {
      console.log(' Task not found.');
    } else {
      if (task.status === 'completed') {
        console.log('ℹ Task is already completed.');
      } else {
        task.status = 'completed';
        saveTasks();
        console.log(`Task "${task.title}" marked as completed.`);
      }
    }
    promptUser();
  });
}

// Start App
showWelcome();
