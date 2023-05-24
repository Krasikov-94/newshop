import { createSlice } from '@reduxjs/toolkit';
import { myInitialState } from '../initialState';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: myInitialState.favorites,
  reducers: {
    addFavorites(state, action) {
      const product = state.find((el) => el === action.payload);
      if (product) {
        return state.filter((el) => el !== action.payload);
      }
      state.push(action.payload);
    },
    deleteFav: (state, action) => {
      return state.filter((el) => el !== action.payload);
    },
  },
});

export const { addFavorites, deleteFav } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
