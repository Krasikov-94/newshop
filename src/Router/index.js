import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { Layout } from '../components/Layout';
import { User } from '../pages/User';
import { Products } from '../pages/Products';
import { CurrentProd } from '../pages/CurrentProd';
import { Favorites } from '../pages/Favorites';
import { Cart } from '../pages/Cart';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
