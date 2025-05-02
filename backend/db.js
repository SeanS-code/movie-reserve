import { Pool } from 'pg';  // Importing Pool from pg module

// Create a new pool instance for database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,  // This will be the container name or 'host.docker.internal' for Docker
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

// Call the connection test function
connectDb();

// Export the pool so it can be used in other parts of the app
export default pool;
