export const myInitialState = {
  user: {},
  filter: {
    search: '',
    sorting: '',
  },
  products: null,
  auth: null,
  cart: [],
  favorites: [],
};

export const getInitState = () => {
  const lc_store = localStorage.getItem('reduxState');
  return lc_store ? JSON.parse(lc_store) : myInitialState;
};
