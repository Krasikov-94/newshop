import { createSlice } from '@reduxjs/toolkit';
import { myInitialState } from '../initialState';

const authSlice = createSlice({
  name: 'auth',
  initialState: myInitialState.auth,
  reducers: {
    setAuth: (_, action) => {
      return action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
