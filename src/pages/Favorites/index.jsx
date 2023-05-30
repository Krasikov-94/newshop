import React from 'react';
import styles from './favorites.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchFavorites } from '../../api/api';
import { deleteFav } from '../../redux/slices/favoritesSlices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

export const Favorites = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites);

  const { data } = useQuery({
    queryKey: ['favorites', favorites],
    queryFn: async () => {
      const responce = await fetchFavorites(token, favorites);
      return responce
        .filter((el) => {
          if (el.value.data?.err) {
            dispatch(deleteFav(el.value._id));
          }
          return el.status !== 'rejected' && !el.value.data.err;
        })
        .map((el) => el.value.data);
    },
    initialData: [],
    enabled: !!favorites.length,
  });

  const delFav = (event, id) => {
    event.stopPropagation();
    dispatch(deleteFav(id));
    toast.error('Товар удален из избранного');
  };

  return (
    <div className={styles.das}>
      <div className={styles.wrapper}>
        {data.length ? (
          data.map((el) => {
            const id = el._id;
            return (
              <div className={styles.product_card}>
                {el.discount > 0 && <div className={styles.badge}>{el.discount}%</div>}
                <div className={styles.product_tumb}>
                  <img src={el.pictures} alt="" />
                  <div className={styles.rat}></div>
                </div>
                <div className={styles.product_details}>
                  <span className={styles.product_catagory}>{el.wight}</span>
                  <div className={styles.name}>
                    <p>{el.name}</p>
                  </div>
                  <div className={styles.product_bottom_details}>
                    <div className={styles.product_price}>{el.price} р.</div>
                    <div className={styles.product_links}></div>
                  </div>
                </div>
                <button
                  className={styles.deleteFav}
                  onClick={(event) => {
                    delFav(event, id);
                  }}>
                  <CancelIcon />
                </button>
              </div>
            );
          })
        ) : (
          <div className={styles.no}>
            <p>
              Нет избранных товаров,перейти
              <button onClick={() => navigate('/products')}>каталог</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
