import { createAction, createSlice } from "@reduxjs/toolkit";

export const removeFromCart = createAction("cart/removeFromCart");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    addQuantity: (state, action) => {
      const index = action.payload.index;
      state.products[index].quantity += action.payload.quantity;
      // state.quantity += action.payload.quantity;
      
      state.total += state.products[index].price * action.payload.quantity;
    },
    reset: (state, action) => {
      state.products = [];
      state.quantity=0;
      state.total = 0;
    }
  },
  extraReducers: {
    [removeFromCart]: (state, action) => {
      const indexToRemove = state.products.findIndex(
        (product) => product._id === action.payload.productId && product.size === action.payload.size
      );
      if (indexToRemove !== -1) {
        const removedProduct = state.products[indexToRemove];
        state.products.splice(indexToRemove, 1);
        state.quantity -= 1;
        state.total -= removedProduct.price * removedProduct.quantity;
      }
    },
  },
});

export const { addProduct, addQuantity, reset } = cartSlice.actions;
export default cartSlice.reducer;
