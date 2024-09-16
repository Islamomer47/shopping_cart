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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Stock"
        value={product.stock}
        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
