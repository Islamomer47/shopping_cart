const productModel = require("../models/productModel");

exports.createProduct = async (productData) => {
  return await productModel.createProduct(
    productData.name,
    productData.description,
    productData.price,
    productData.stock
  );
};

exports.getProducts = async () => {
  return await productModel.getProducts();
};

exports.getProductById = async (id) => {
  return await productModel.getProductById(id);
};

exports.updateProduct = async (id, productData) => {
  return await productModel.updateProduct(
    id,
    productData.name,
    productData.description,
    productData.price,
    productData.stock
  );
};

exports.deleteProduct = async (id) => {
  return await productModel.deleteProduct(id);
};
