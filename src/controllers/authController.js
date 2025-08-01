import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/userModel.js';

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, hashedPassword);
    const token = generateToken(userId);

    res.status(201).json({ userId, name, email, token });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);

    res.status(200).json({ userId: user.id, name: user.name, email: user.email, token });
  } catch (err) {
    next(err);
  }
};
