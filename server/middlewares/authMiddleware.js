const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.verifyToken = (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(
      token,
      "b7d9e96a3f9e8d5c5c66f88b7e5a5f388dd2b99a3e1f67b09c6a74a4b77f0e0f"
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid token." });
  }
};

exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.user.id);
    if (user && user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
