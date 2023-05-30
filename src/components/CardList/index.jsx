import React from 'react';
import { useSelector } from 'react-redux';
import { CurrentCard } from '../CurrentCard';
import style from './cardlist.module.css';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { fetchProductsWithSearch } from '../../api/api';
import { PacmanLoader } from 'react-spinners';
import { sortingData } from '../../utils/sortingData';

export const CardList = () => {
  const { token } = useAuth();
  const { search } = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.filter);

  const { data } = useQuery({
    queryKey: ['getProducts', token, search],
    queryFn: async () => {
      const res = await fetchProductsWithSearch(token, search);
      const responce = await res.json();
      return responce;
    },
    initialData: [],
  });

  return (
    <>
      <div className={style.wrapper}>
        {data ? (
          sortingData(data, sorting).map((el) => {
            return <CurrentCard key={el._id} prod={el} />;
          })
        ) : (
          <PacmanLoader color="#000000" size={66} speedMultiplier={5} />
        )}
      </div>
    </>
  );
};
