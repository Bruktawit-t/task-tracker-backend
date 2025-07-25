const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./src/routes/taskRoutes');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Task Tracker API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
