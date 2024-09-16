const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");

// Route definitions
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);

module.exports = router;
