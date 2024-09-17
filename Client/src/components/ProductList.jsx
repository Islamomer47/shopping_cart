import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import {
  removeProduct,
  updateExistingProduct,
  getAllProducts,
} from "../features/productSlice";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  // Local state to store the role from localStorage and editing state
  const [role, setRole] = useState("user");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Retrieve the role from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []); // Only run once when the component mounts

  // Access the `data` field from products
  const productList = products?.data || [];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct(productId));
    dispatch(getAllProducts());
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      const updatedProductData = {
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        stock: editingProduct.stock,
      };
      dispatch(
        updateExistingProduct({
          productId: editingProduct.id,
          productData: updatedProductData,
        })
      );

      dispatch(getAllProducts());
      setIsEditing(false);
      setEditingProduct(null);
    }
  };

  const handleChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>

      {isEditing && editingProduct && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
          <form onSubmit={handleUpdateProduct} className="space-y-4">
            <input
              type="text"
              name="name"
              value={editingProduct.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="description"
              value={editingProduct.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 w-full"
            />
            <input
              type="number"
              name="price"
              value={editingProduct.price}
              onChange={handleChange}
              placeholder="Price"
              className="border p-2 w-full"
              required
            />
            <input
              type="number"
              name="stock"
              value={editingProduct.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="border p-2 w-full"
              required
            />
            <div className="space-x-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <ul>
        {productList.length === 0 ? (
          <p className="text-gray-500">No products available</p>
        ) : (
          productList.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                <p className="text-sm text-gray-800 font-semibold">
                  ${product.price}
                </p>
              </div>
              <div>
                {role === "admin" ? (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductList;
