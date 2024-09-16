// /src/pages/CustomerDashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/productSlice";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <ProductList products={products} />
      <Cart /> {/* Display cart */}
    </div>
  );
};

export default CustomerDashboard;
