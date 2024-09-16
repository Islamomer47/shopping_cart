const { pool } = require("../config/db");

exports.createProduct = async (name, description, price, stock) => {
  const query =
    "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [name, description, price, stock]);
  return result.rows[0];
};

exports.getProducts = async () => {
  const query = "SELECT * FROM products";
  const result = await pool.query(query);
  return result.rows;
};

exports.getProductById = async (id) => {
  const query = "SELECT * FROM products WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

exports.updateProduct = async (id, name, description, price, stock) => {
  const query =
    "UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *";
  const result = await pool.query(query, [name, description, price, stock, id]);
  return result.rows[0];
};

exports.deleteProduct = async (id) => {
  const query = "DELETE FROM products WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rowCount > 0;
};
