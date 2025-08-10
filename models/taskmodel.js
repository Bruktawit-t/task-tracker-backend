import pool from '../db.js';

export const getAllTasksByUser = async (userId) => {
  const [rows] = await pool.query(
    'SELECT * FROM tasks WHERE userId = ? ORDER BY position ASC',
    [userId]
  );
  return rows;
};

export const createTask = async (task) => {
  const { userId, title, description, status, position } = task;
  const [result] = await pool.query(
    'INSERT INTO tasks (userId, title, description, status, position) VALUES (?, ?, ?, ?, ?)',
    [userId, title, description, status, position]
  );
  return result.insertId;
};

export const updateTask = async (id, userId, task) => {
  const { title, description, status, position } = task;
  const [result] = await pool.query(
    'UPDATE tasks SET title = ?, description = ?, status = ?, position = ? WHERE id = ? AND userId = ?',
    [title, description, status, position, id, userId]
  );
  return result.affectedRows;
};

export const deleteTask = async (id, userId) => {
  const [result] = await pool.query(
    'DELETE FROM tasks WHERE id = ? AND userId = ?',
    [id, userId]
  );
  return result.affectedRows;
};
