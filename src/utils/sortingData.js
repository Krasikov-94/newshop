import {
  SORTING_ALL,
  SORTING_PRICE_HIGH,
  SORTING_PRICE_LOW,
  SORTING_RATING,
  SORTING_SALE,
} from './constants';

const priceCalc = (price, discount) => {
  return price - (price * discount) / 100;
};

export const sortingData = (data, sortingType) => {
  switch (sortingType) {
    case SORTING_PRICE_HIGH:
      return [...data].sort(
        (a, b) => priceCalc(b.price, b.discount) - priceCalc(a.price, a.discount),
      );
    case SORTING_PRICE_LOW:
      return [...data].sort(
        (a, b) => priceCalc(a.price, a.discount) - priceCalc(b.price, b.discount),
      );
    case SORTING_SALE:
      return [...data].sort((a, b) => b.discount - a.discount);
    case SORTING_RATING:
      return [...data].sort((a, b) => b.likes.length - a.likes.length);
    default:
      return data;
  }
};
