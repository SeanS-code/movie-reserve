import dotenv from 'dotenv'
import { Pool } from 'pg';

dotenv.config()

// Create a new pool instance for database connection
const pool = new Pool({
  user:  process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Async function to test the database connection
const connectDb = async () => {
  try {
    await pool.connect();  // Connect to the PostgreSQL database
    console.log('Connected to the PostgreSQL database');
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
  }
};

// Call connection function
connectDb();
export default pool;
