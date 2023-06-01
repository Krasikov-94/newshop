import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { User } from '../pages/User';
import { Products } from '../pages/Products';
import { CurrentProd } from '../pages/CurrentProd';
import { Favorites } from '../pages/Favorites';
import { Cart } from '../pages/Cart';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/Login';
import { RegisterPage } from '../pages/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:currentProd',
        element: <CurrentProd />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
]);
