import { createSlice } from '@reduxjs/toolkit';
import { myInitialState } from '../initialState';

export const cartSlices = createSlice({
  name: 'counter',
  initialState: myInitialState.cart,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    clearCart: () => myInitialState.cart,
    deleteCart: (state, action) => {
      return state.filter((el) => el._id !== action.payload);
    },
    increaseTheAmountOfProduct: (state, action) => {
      state.forEach((el) => {
        if (el._id === action.payload) {
          return (el.quantity += 1);
        }
        return el;
      });
    },
    decreaseTheAmountOfProduct: (state, action) => {
      state.forEach((el) => {
        if (el._id === action.payload) {
          return (el.quantity -= 1);
        }
        return el;
      });
    },
    deleteSelectedItems: (state, action) => {
      return state.filter((obj1) => {
        return action.payload.find((obj2) => obj1._id !== obj2);
      });
    },
  },
});

export const {
  addProduct,
  clearCart,
  deleteCart,
  increaseTheAmountOfProduct,
  decreaseTheAmountOfProduct,
  deleteSelectedItems,
} = cartSlices.actions;

export const cartReducer = cartSlices.reducer;
