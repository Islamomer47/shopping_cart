// /src/pages/AdminDashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, createProduct } from "../features/productSlice";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleAddProduct = (productData) => {
    dispatch(createProduct(productData)).then(() => {
      dispatch(getAllProducts());
    });
  };

  return (
    <div>
      <h1 className="text-center">Admin Dashboard</h1>
      <ProductForm onSubmit={handleAddProduct} />
      <ProductList products={list} />
    </div>
  );
};

export default AdminDashboard;
