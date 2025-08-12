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
  const { userId, title, description, completed = 0 } = task;
  const [result] = await pool.execute(
    'INSERT INTO tasks (userId, title, description, completed) VALUES (?, ?, ?, ?)',
    [userId, title, description, completed]
  );
  return result.insertId;
};

// Update an existing task by id and userId
// tasksModel.js
export const updateTask = async (id, userId, task) => {
  const fields = [];
  const values = [];

  if (task.title !== undefined) {
    fields.push('title = ?');
    values.push(task.title);
  }
  if (task.description !== undefined) {
    fields.push('description = ?');
    values.push(task.description);
  }
  if (task.completed !== undefined) {
    fields.push('completed = ?');
    values.push(task.completed);
  }
  if (task.due_date !== undefined) {
    fields.push('due_date = ?');
    values.push(task.due_date);
  }
  if (task.priority !== undefined) {
    fields.push('priority = ?');
    values.push(task.priority);
  }

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
