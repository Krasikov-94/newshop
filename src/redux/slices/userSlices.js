import { createSlice } from '@reduxjs/toolkit';
import { myInitialState } from '../initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState: myInitialState.user,
  reducers: {
    setUpUser: (_, action) => {
      return action.payload;
    },
    clearUser: () => myInitialState.user,
  },
});

// Action creators are generated for each case reducer function
export const { setUpUser, cleanUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
