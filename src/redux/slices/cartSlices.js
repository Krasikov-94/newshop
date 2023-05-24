import { createSlice } from '@reduxjs/toolkit';
import { myInitialState } from '../initialState';

export const cartSlices = createSlice({
  name: 'counter',
  initialState: myInitialState.cart,
  reducers: {
    addToCart(state, action) {
      const product = state.find((el) => el._id === action.payload.prod_id);
      if (product) {
        product.count++;
        return;
      }
      state.push({
        _id: action.payload.prod_id,
        count: 1,
        isSelected: true,
        totalPrice: action.payload.totalPrice,
      });
    },
    clearCart: () => myInitialState.cart,
    deleteCart: (state, action) => {
      return state.filter((el) => el._id !== action.payload);
    },
    increaseTheAmountOfProduct: (state, action) => {
      const product = state.find((el) => el._id === action.payload);

      if (product) {
        product.count++;
        return;
      }
    },
    decreaseTheAmountOfProduct: (state, action) => {
      const product = state.find((el) => el._id === action.payload);

      if (product) {
        if (product.count > 1) {
          product.count--;
          return;
        }

        return state.filter((product) => product._id !== action.payload);
      }
    },
    selectOne: (state, action) => {
      const product = state.find((el) => el._id === action.payload.id);

      if (product) {
        if (action.payload.isChecked === true) {
          product.isSelected = true;
        } else {
          product.isSelected = false;
        }
      }
    },
    deleteSelectCard: (state) => {
      return state.filter((el) => el.isSelected !== true);
    },
  },
});

export const {
  addToCart,
  clearCart,
  deleteCart,
  increaseTheAmountOfProduct,
  decreaseTheAmountOfProduct,
  selectOne,
  deleteSelectCard,
} = cartSlices.actions;

export const cartReducer = cartSlices.reducer;
