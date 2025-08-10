import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test connection function
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL database connected successfully!');
    connection.release();
  } catch (error) {
    console.error(' MySQL connection failed:', error.message);
  }
}

testConnection();

export default pool;
