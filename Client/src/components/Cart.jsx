import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cartSlice";

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Ensure total is a number before using toFixed
  const formattedTotal = isNaN(total) ? "0.00" : total.toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      <ul>
        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-4 mb-2 bg-gray-100 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-sm text-gray-600">Stock: {item.stock}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    className="bg-blue-500 text-white w-8 h-8 rounded flex items-center justify-center text-lg font-bold"
                    onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    className="bg-yellow-500 text-white w-8 h-8 rounded flex items-center justify-center text-lg font-bold"
                    onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
        <h3 className="text-xl font-bold">
          Total: <span className="text-green-600">${formattedTotal}</span>
        </h3>
      </div>
    </div>
  );
};

export default Cart;
