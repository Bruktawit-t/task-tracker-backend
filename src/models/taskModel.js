import db from '../config/db.js';

const Task = {
  getAllTasks: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getTaskById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  createTask: (taskData) => {
    const { title, description, due_date, completed } = taskData;
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO tasks (title, description, due_date, completed) VALUES (?, ?, ?, ?)',
        [title, description, due_date, completed],
        (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, ...taskData });
        }
      );
    });
  },

  updateTask: (id, updatedData) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE tasks SET ? WHERE id = ?', [updatedData, id], (err) => {
        if (err) return reject(err);
        resolve({ id, ...updatedData });
      });
    });
  },

  deleteTask: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

export default Task;
