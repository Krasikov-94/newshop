import { createSlice } from '@reduxjs/toolkit';
import { myInitialState } from '../initialState';

export const productsSlice = createSlice({
  name: 'products',
  initialState: myInitialState.products,
  reducers: {
    getProd: (_, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getProd } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
