import db from './src/config/db.js';

const createTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        due_date DATE,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Table "tasks" created successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to create table:', err.message);
    process.exit(1);
  }
};

createTable();
