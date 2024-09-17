// /src/components/ProductForm.js
import React, { useState } from "react";

const ProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure all fields are trimmed and validated
    const formattedProduct = {
      name: product.name.trim(),
      price: parseFloat(product.price).toFixed(2),
      description: product.description.trim(),
      stock: parseInt(product.stock, 10) || 0,
    };
    onSubmit(formattedProduct);
    setProduct({
      name: "",
      price: "",
      description: "",
      stock: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Description"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
      />

      <input
        type="number"
        placeholder="Stock"
        value={product.stock}
        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
