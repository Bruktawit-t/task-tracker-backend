import db from '../config/db.js';



const getAllTasks = async () => {
  const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
  return rows;
};

const getTaskById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0];
};

const createTask = async (taskData) => {
  const { title, description, due_date, completed } = taskData;
  const [result] = await db.query(
    'INSERT INTO tasks (title, description, due_date, completed) VALUES (?, ?, ?, ?)',
    [title, description, due_date, completed ?? false]
  );
  return { id: result.insertId, ...taskData };
};

const updateTask = async (id, updatedData) => {
  const { title, description, due_date, completed } = updatedData;
  await db.query(
    'UPDATE tasks SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?',
    [title, description, due_date, completed, id]
  );
  return { id, ...updatedData };
};

const deleteTask = async (id) => {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
};

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
