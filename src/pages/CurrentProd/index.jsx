import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import style from './currentprod.module.css';
import { apiOneProd } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlices';
import { toast } from 'react-toastify';
import { BsHeart } from 'react-icons/bs';
import 'react-toastify/dist/ReactToastify.css';
import { addFavorites } from '../../redux/slices/favoritesSlices';
import { TiArrowBack } from 'react-icons/ti';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from '../../hooks/useAuth';

export const CurrentProd = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const dispatch = useDispatch();

  const { currentProd } = useParams();

  const { data: oneProd } = useQuery({
    queryKey: ['oneProd', token, currentProd],
    queryFn: async function oneProd() {
      try {
        const response = await axios.get(`${apiOneProd}${currentProd}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  let totalPrice = null;
  if (oneProd) {
    totalPrice = oneProd.discount
      ? oneProd.price - (oneProd.price * oneProd.discount) / 100
      : oneProd.price;
  }

  const cartProduct = () => {
    dispatch(addToCart({ prod_id: oneProd._id, totalPrice }));
    toast.success('Товар добавлен в корзину');
  };

  const favoritesProd = () => {
    dispatch(addFavorites(oneProd._id));
    toast.success('Товар добавлен в избранное');
  };
  return (
    <div className={style.body}>
      <button className={style.exit} onClick={() => navigate('/products')}>
        <TiArrowBack />
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
              </div>
              <div className={style.center}>
                <img className={style.img} src={oneProd.pictures} alt={oneProd.name} />
              </div>
              <div className={style.btn}>
                <Button
                  style={{ padding: '10px', margin: '20px' }}
                  size="small"
                  variant="contained"
                  endIcon={<AddShoppingCartIcon />}
                  onClick={() => cartProduct()}>
                  Купить
                </Button>
                <Button
                  style={{ padding: '10px' }}
                  size="small"
                  variant="contained"
                  endIcon={<BsHeart />}
                  onClick={() => favoritesProd()}>
                  В избранное
                </Button>
              </div>
            </div>
            <span>Описание : {oneProd.description}</span>
          </div>
        </>
      ) : (
        <p>Данные загружаются.........</p>
      )}
    </div>
  );
};
