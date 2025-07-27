const db = require('../config/db'); // Your MySQL2 connection

// Get all tasks
function getAllTasks() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM tasks ORDER BY dueDate ASC', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

// Get task by ID
function getTaskById(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
}

// Create new task
function createTask(task) {
  return new Promise((resolve, reject) => {
    const { title, description = '', dueDate = null, completed = 0 } = task;
    const query = 'INSERT INTO tasks (title, description, dueDate, completed) VALUES (?, ?, ?, ?)';
    const values = [title, description, dueDate, completed];

    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, ...task });
    });
  });
}

// Update existing task by ID
function updateTask(id, task) {
  return new Promise((resolve, reject) => {
    const { title, description = '', dueDate = null, completed = 0 } = task;
    const query = 'UPDATE tasks SET title = ?, description = ?, dueDate = ?, completed = ? WHERE id = ?';
    const values = [title, description, dueDate, completed, id];

    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

// Delete task by ID
function deleteTask(id) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
