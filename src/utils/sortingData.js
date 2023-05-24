import {
  SORTING_ALL,
  SORTING_PRICE_HIGH,
  SORTING_PRICE_LOW,
  SORTING_RATING,
  SORTING_SALE,
} from './constants';

export const sortingData = (data, sortingType) => {
  switch (sortingType) {
    case SORTING_PRICE_HIGH:
      return [...data].sort(
        (a, b) =>
          (b.discount ? b.price - (b.price * b.discount) / 100 : b.price) -
          (a.discount ? a.price - (a.price * a.discount) / 100 : a.price),
      );
    case SORTING_PRICE_LOW:
      return [...data].sort(
        (a, b) =>
          (a.discount ? a.price - (a.price * a.discount) / 100 : a.price) -
          (b.discount ? b.price - (b.price * b.discount) / 100 : b.price),
      );
    case SORTING_SALE:
      return [...data].sort((a, b) => b.discount - a.discount);
    case SORTING_RATING:
      return [...data].sort((a, b) => b.likes.length - a.likes.length);
    default:
      return data;
  }
};
