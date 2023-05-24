import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlices';
import { getInitState } from './initialState';
import { filterReducer } from './slices/filterSlices';
import { productsReducer } from './slices/productSlice';
import { authReducer } from './slices/authSlices';
import { cartReducer } from './slices/cartSlices';
import { favoritesReducer } from './slices/favoritesSlices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  preloadedState: getInitState(),
});
store.subscribe(() => localStorage.setItem('reduxState', JSON.stringify(store.getState())));
