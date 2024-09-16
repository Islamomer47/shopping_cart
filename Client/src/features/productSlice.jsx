import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/apiClient";

// Thunks for product actions

// Fetch all products
export const getAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

// Fetch product by ID
export const getProductById = createAsyncThunk(
  "products/fetchById",
  async (productId) => {
    const response = await fetchProductById(productId);
    return response.data;
  }
);

// Add a new product
export const createProduct = createAsyncThunk(
  "products/add",
  async (productData) => {
    const response = await addProduct(productData);
    return response.data;
  }
);

// Update an existing product by ID
export const updateExistingProduct = createAsyncThunk(
  "products/update",
  async ({ productId, productData }) => {
    const response = await updateProduct(productId, productData);
    return response.data;
  }
);

// Delete a product by ID
export const removeProduct = createAsyncThunk(
  "products/delete",
  async (productId) => {
    await deleteProduct(productId);
    return productId;
  }
);

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState: { list: [], product: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching all products
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      // Handle fetching a product by ID
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload; // Store the fetched product by ID
      })
      // Handle adding a new product
      .addCase(createProduct.fulfilled, (state, action) => {
        console.log("Current state.list:", state.list); // Debugging line
        if (Array.isArray(state.list)) {
          state.list.push(action.payload);
        } else {
          state.list = [action.payload];
        }
      })

      // Handle updating an existing product
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload; // Update the product in the list
        }
      })
      // Handle deleting a product
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
