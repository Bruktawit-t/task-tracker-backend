import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

import taskRoutes from './src/routes/taskRoutes.js';
import authRoutes from './src/routes/authRoutes.js'; // ✅ NEW
import errorHandler from './src/middlewares/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Auth Routes (register, login)
app.use('/api/auth', authRoutes);

// Task Routes
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
