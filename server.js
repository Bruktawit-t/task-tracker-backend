import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup to allow your frontend (Netlify)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // your frontend URL
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

// Health check
app.get('/', (req, res) => {
  res.send('Task Tracker Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
