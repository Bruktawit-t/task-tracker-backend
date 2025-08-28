import pool from '../db.js';

// Get all tasks for a user
export const getAllTasksByUser = async (userId) => {
  const [rows] = await pool.execute(
    'SELECT * FROM tasks WHERE userId = ? ORDER BY id ASC',
    [userId]
  );
  return rows;
};

// Create a new task
export const createTask = async (task) => {
  const { userId, title, description, due_date, priority, completed = 0 } = task;
  const [result] = await pool.execute(
    'INSERT INTO tasks (userId, title, description, due_date, priority, completed) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, title, description, due_date, priority, completed]
  );
  return result.insertId;
};

// Update task by id and userId
export const updateTask = async (id, userId, task) => {
  const fields = [];
  const values = [];

  if (task.title !== undefined) { fields.push('title = ?'); values.push(task.title); }
  if (task.description !== undefined) { fields.push('description = ?'); values.push(task.description); }
  if (task.due_date !== undefined) { fields.push('due_date = ?'); values.push(task.due_date); }
  if (task.priority !== undefined) { fields.push('priority = ?'); values.push(task.priority); }
  if (task.completed !== undefined) { fields.push('completed = ?'); values.push(task.completed); }

  values.push(id, userId);

  const [result] = await pool.execute(
    `UPDATE tasks SET ${fields.join(', ')} WHERE id = ? AND userId = ?`,
    values
  );

  return result.affectedRows > 0;
};

// Delete a task by id and userId
export const deleteTask = async (id, userId) => {
  const [result] = await pool.execute(
    'DELETE FROM tasks WHERE id = ? AND userId = ?',
    [id, userId]
  );
  return result.affectedRows > 0;
};
