const { Pool } = require("pg");
const { dbConfig } = require("./envConfig");

const pool = new Pool(dbConfig);

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL Database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
