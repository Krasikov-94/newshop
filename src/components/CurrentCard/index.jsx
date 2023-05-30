import React from 'react';
import style from './currentcard.module.css';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlices';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const CurrentCard = ({ prod }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //цена с учетом скидки
  const totalPrice = prod.discount ? prod.price - (prod.price * prod.discount) / 100 : prod.price;

  //для сортировки по среднему рейтингу

  const avgRating = prod.reviews.map((p) => p.rating);

  const ratSum = avgRating.reduce((acc, cur) => acc + cur, 0);

  const rat = Math.round(ratSum / avgRating.length);

  const addCart = (event) => {
    dispatch(addToCart({ prod_id: prod._id, totalPrice }));
    toast.success('Товар добавлен в корзину');
  };

  return (
    <>
      <div className={style.product_card}>
        {prod.discount > 0 && <div className={style.badge}>{prod.discount}%</div>}
        <div className={style.product_tumb}>
          <img src={prod.pictures} alt="" onClick={() => navigate(`/products/${prod._id}`)} />
          <div className={style.rat}>
            <Star rat={rat} />
          </div>
        </div>
        <div className={style.product_details}>
          <span className={style.product_catagory}>{prod.wight}</span>
          <div className={style.name}>
            <p>{prod.name}</p>
          </div>
          <div className={style.product_bottom_details}>
            <div className={style.product_price}>{totalPrice} р.</div>
            <div className={style.product_links}>
              {prod.stock ? (
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<AddShoppingCartIcon />}
                  onClick={(event) => addCart(event)}>
                  Купить
                </Button>
              ) : (
                'Увы, товар закончился'
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//звезды рейтинга
const Star = ({ rat }) => {
  const ratingStart = Array.from({ length: 5 }, (elem, index) => {
    return <span key={index}>{rat >= index + 1 ? <FaStar /> : <AiOutlineStar />}</span>;
  });

  return <div>{ratingStart}</div>;
};
