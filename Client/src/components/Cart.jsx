import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);

  // Ensure total is a number before using toFixed
  const formattedTotal = isNaN(total) ? "0.00" : total.toFixed(2);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} - {item.description} - {item.stock} x{" "}
              {item.quantity}
            </li>
          ))
        )}
      </ul>
      <h3>Total: ${formattedTotal}</h3>
    </div>
  );
};

export default Cart;
