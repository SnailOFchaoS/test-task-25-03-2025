import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://67e43b942ae442db76d39cad.mockapi.io/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error adding product :`, error);
      throw error;
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({productId, productData}) => {
    console.log("productId:", productId);
    console.log("productData:", productData);
    try {
      const response = await axios.put(`${BASE_URL}/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error adding product :`, error);
      throw error;
    }
  }
);

const initialState = {
  products: [],
  product: null,
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addProduct.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { clearProduct } = productsSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.product;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;