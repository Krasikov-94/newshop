import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentCard } from '../CurrentCard';
import style from './cardlist.module.css';

export const CardList = () => {
  const prod = useSelector((state) => state.products);
  const search = useSelector((state) => state.filter.search);
  const [realProd, setRealProd] = useState(prod);

  useEffect(() => {
    if (prod) {
      setRealProd(prod.filter((el) => el.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [prod, search]);
  return (
    <div className={style.wrapper}>
      {realProd &&
        realProd.map((el) => {
          return <CurrentCard key={el._id} prod={el} />;
        })}
    </div>
  );
};
