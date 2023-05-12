import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import style from './currentprod.module.css';
import { TOKEN, apiOneProd } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/slices/cartSlices';

export const CurrentProd = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN);
  useEffect(() => {
    if (!token) navigate('/signin');
  }, [navigate, token]);

  const dispatch = useDispatch();

  const { currentProd } = useParams();
  // console.log(currentProd);

  const { data: oneProd } = useQuery({
    queryKey: ['oneProd'],
    queryFn: async function oneProd() {
      try {
        const response = await axios.get(`${apiOneProd}${currentProd}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const cartProduct = () => {
    const { _id, stock } = oneProd;
    dispatch(addProduct({ _id, stock, quantity: 0 }));
  };

  return (
    <>
      <div className={style.body}>
        <button className={style.exit} onClick={() => navigate(-1)}>
          Назад
        </button>
        {oneProd ? (
          <>
            <div className={style.general}>
              <h1>{oneProd.name}</h1>
              <div className={style.wrapper}>
                <div className={style.left}>
                  <p>Вес : {oneProd.wight}.</p>
                  <p>Цена : {oneProd.price} рублей</p>
                  <p>Скидка : {oneProd.discount}%</p>
                  <span>Описание : {oneProd.description}</span>
                </div>
                <div className={style.right}>
                  <img className={style.img} src={oneProd.pictures} alt={oneProd.name} />
                </div>
                <button className={style.btn} onClick={() => cartProduct()}>
                  Купить
                </button>
                <button className={style.btn}>В избранное</button>
              </div>
            </div>
          </>
        ) : (
          <p>Данные загружаются.........</p>
        )}
      </div>
    </>
  );
};
