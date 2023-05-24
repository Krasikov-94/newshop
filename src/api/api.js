import axios from 'axios';
import { userApi, editAvatarApi, editAboutApi } from '../utils/constants';

export const fetchCartProducts = (token, cart) =>
  Promise.allSettled(
    cart.map((product) =>
      fetch(`https://api.react-learning.ru/products/${product._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          return { _id: product._id, data };
        }),
    ),
  );
export const fetchProductsWithSearch = (token, search) =>
  fetch(`https://api.react-learning.ru/products/search?query=${search}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchFavorites = (token, cart) =>
  Promise.allSettled(
    cart.map((product) =>
      fetch(`https://api.react-learning.ru/products/${product}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          return { _id: product, data };
        }),
    ),
  );

export const fetchNewProduct = (token, values) => {
  axios.post('https://api.react-learning.ru/products/', JSON.stringify(values), {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
};

export const getUser = async (token) => {
  const res = await axios.get(userApi, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const editPhoto = async (avatar, token) => {
  const res = await axios.patch(editAvatarApi, avatar, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return res;
};
