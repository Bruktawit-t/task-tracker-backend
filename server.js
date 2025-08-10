import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send('Task Tracker Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
