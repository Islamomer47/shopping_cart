// /src/components/ProductList.js
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  // Access the `data` field from products
  const productList = products?.data || []; // Ensure `data` is an array

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {productList.length === 0 ? (
          <p>No products available</p>
        ) : (
          productList.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price} - {product.description} -{" "}
              {product.stock}
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductList;
