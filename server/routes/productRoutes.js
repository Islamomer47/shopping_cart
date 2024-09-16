const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for product management
// Only allow admins to create, update, and delete products

// Get all products (accessible to all users)
router.get("/get-all-product", productController.getProducts);

// Get a product by ID (accessible to all users)
router.get("/get-product-byId/:id", productController.getProductById);

// Create a new product (admin only)
router.post(
  "/add-product",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  productController.createProduct
);

// Update a product by ID (admin only)
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  productController.updateProduct
);

// Delete a product by ID (admin only)
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  productController.deleteProduct
);

module.exports = router;
