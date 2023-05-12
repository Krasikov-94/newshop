import { createSlice } from '@reduxjs/toolkit';
import { myInitialState } from '../initialState';

const favoritesSlice = createSlice({
  name: 'auth',
  initialState: myInitialState.auth,
  reducers: {
    a: (_, action) => {
      return action.payload;
    },
  },
});

export const { a } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
