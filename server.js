import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './src/routes/taskRoutes.js';
import errorHandler from './src/middlewares/errorMiddleware.js';

console.log('DB_USER:', process.env.DB_USER); // <-- Debugging line
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
