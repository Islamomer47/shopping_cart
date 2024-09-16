const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret =
  "b7d9e96a3f9e8d5c5c66f88b7e5a5f388dd2b99a3e1f67b09c6a74a4b77f0e0f";

exports.generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null; // Return null if token is invalid or expired
  }
};
