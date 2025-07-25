const db = require('../config/db');

function getAllTasks(callback) {
  db.query('SELECT * FROM tasks ORDER BY dueDate ASC', callback);
}

function getTaskById(id, callback) {
  db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
    callback(err, results[0]);
  });
}

function createTask(task, callback) {
  const { title, description = '', dueDate = null, completed = 0 } = task;
  db.query(
    'INSERT INTO tasks (title, description, dueDate, completed) VALUES (?, ?, ?, ?)',
    [title, description, dueDate, completed],
    (err, result) => {
      if (err) return callback(err);
      callback(null, { id: result.insertId, ...task });
    }
  );
}

function updateTask(id, task, callback) {
  const { title, description = '', dueDate = null, completed = 0 } = task;
  db.query(
    'UPDATE tasks SET title = ?, description = ?, dueDate = ?, completed = ? WHERE id = ?',
    [title, description, dueDate, completed, id],
    callback
  );
}

function deleteTask(id, callback) {
  db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
