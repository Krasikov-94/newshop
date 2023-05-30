import React from 'react';
import styles from './cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteCart, deleteSelectCard } from '../../redux/slices/cartSlices';
import { useQuery } from '@tanstack/react-query';
import { fetchCartProducts } from '../../api/api';
import { PacmanLoader } from 'react-spinners';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CardForCart } from '../../components/CardForCart';

export const Cart = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { data, isLoading } = useQuery({
    queryKey: ['cart', cart.length],
    queryFn: async () => {
      const responce = await fetchCartProducts(token, cart);

      return responce
        .filter((el) => {
          if (el.value.data?.err?.statusCode === 404) {
            dispatch(deleteCart(el.value._id));
          }
          return el.status !== 'rejected' && !el.value.data.err;
        })
        .map((el) => el.value.data);
    },
    initialData: [],
    enabled: !!cart.length,
  });

  if (isLoading) {
    return <PacmanLoader color="#000000" size={66} speedMultiplier={5} />;
  }

  const priceProd = data.map((el) => {
    const prod = cart.find((pr) => pr._id === el._id);
    const sumCartProd = prod ? prod.count * prod.totalPrice : '';
    return sumCartProd;
  });

  const sumAllProd = priceProd.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.as}>
        {data.length > 0 && (
          <div className={styles.deleteBtn}>
            <button
              onClick={() => {
                dispatch(deleteSelectCard());
              }}
              className={styles.deleteAll}>
              Удалить выбранные товары
            </button>
            <button onClick={() => dispatch(clearCart())} className={styles.deleteAll}>
              Удалить все товары
            </button>
          </div>
        )}
        {data.length > 0 ? (
          data.map((prod) => <CardForCart prod={prod} key={prod._id} />)
        ) : (
          <p>
            Товары еще не добавлены в корзину, перейти в
            <button onClick={() => navigate('/products')}>каталог</button>
          </p>
        )}
      </div>
      {data.length > 0 && (
        <div className={styles.conditions}>
          <h1>Условия заказа</h1>
          <hr />
          <p>Итого:</p>
          <div className={styles.total}>
            <p>{cart.length}шт.</p>
            <p>Цена:{sumAllProd}</p>
          </div>
          <button onClick={() => alert('Ура')}>Перейти к оформлению</button>
        </div>
      )}
    </div>
  );
};
