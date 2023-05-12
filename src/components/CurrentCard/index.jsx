import React from 'react';
import style from './currentcard.module.css';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/slices/cartSlices';
import { motion } from 'framer-motion';

export const CurrentCard = ({ prod }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allProducts = useSelector((state) => state.products);

  //цена с учетом скидки
  const totalPrice = prod.discount ? prod.price - (prod.price * prod.discount) / 100 : prod.price;

  //для сортировки по среднему рейтингу
  let avgRating = [];
  prod.reviews.map((p) => {
    return avgRating.push(p.rating);
  });
  const ratSum = avgRating.reduce((acc, cur) => acc + cur, 0);
  const ratLength = avgRating.length;
  const rat = Math.round(ratSum / ratLength);
  avgRating = rat ? rat : 0;

  const addToCart = () => {
    const id = prod._id;
    const a = allProducts.filter((el) => el._id === id);
    const { _id, stock } = a[0];
    dispatch(addProduct({ _id, stock, quantity: 1 }));
  };

  const currentProduct = () => {
    navigate(`/products/${prod._id}`);
  };

  return (
    <>
      <div className={style.product_card}>
        {prod.discount > 0 && <div className={style.badge}>{prod.discount}%</div>}
        <div className={style.product_tumb}>
          <img src={prod.pictures} alt="" onClick={() => currentProduct()} />
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
            {/* <div className={style.stock}>{prod.stock}шт.</div> */}
            <div className={style.product_price}>{totalPrice} р.</div>
            <div className={style.product_links}>
              {prod.stock ? (
                <button className={style.btn} onClick={() => addToCart()}>
                  В корзину
                </button>
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
