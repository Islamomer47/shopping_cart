const { pool } = require("../config/db");

exports.getAllUsers = async () => {
  const query = "SELECT id, username, role FROM users";
  const result = await pool.query(query);
  return result.rows;
};

exports.getUserById = async (id) => {
  const query = "SELECT id, username, role FROM users WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

exports.updateUser = async (id, username, role) => {
  const query =
    "UPDATE users SET username = $1, role = $2 WHERE id = $3 RETURNING id, username, role";
  const result = await pool.query(query, [username, role, id]);
  return result.rows[0];
};

exports.deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rowCount > 0;
};

exports.createUser = async (username, password, role) => {
  const query =
    "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role";
  const result = await pool.query(query, [username, password, role]);
  return result.rows[0];
};

exports.findUserByUsername = async (username) => {
  const query =
    "SELECT id, username, password, role FROM users WHERE username = $1";
  const result = await pool.query(query, [username]);
  return result.rows[0];
};
