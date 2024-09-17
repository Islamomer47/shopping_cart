// /src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], total: 0 },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = parseFloat(state.total) + parseFloat(action.payload.price); // Ensure total is a number
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.total =
          parseFloat(state.total) - parseFloat(item.price) * item.quantity; // Ensure total is a number
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        state.total = parseFloat(state.total) + parseFloat(item.price); // Ensure total is a number
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.total = parseFloat(state.total) - parseFloat(item.price); // Ensure total is a number
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
          state.total = parseFloat(state.total) - parseFloat(item.price); // Ensure total is a number
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
