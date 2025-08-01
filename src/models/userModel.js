// src/models/userModel.js
import db from '../config/db.js';

// Create a new user
export const createUser = async (name, email, hashedPassword) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return result.insertId;
};

// Get user by email (used in login & check for duplicates)
export const getUserByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0]; // returns user object or undefined
};
