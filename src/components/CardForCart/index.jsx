import React, { useState } from 'react';
import styles from '../../pages/Cart/cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseTheAmountOfProduct,
  deleteCart,
  increaseTheAmountOfProduct,
  selectOne,
} from '../../redux/slices/cartSlices';

export const CardForCart = ({ prod }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const cartProd = cart.find((el) => el._id === prod._id);

  const soldCheckbox = (event) => {
    const chek = event.target.offsetParent;
    const isChecked = event.target.checked;
    const id = chek.dataset.id;
    dispatch(selectOne({ id, isChecked }));
  };

  const deleteProd = (id) => {
    dispatch(deleteCart(id));
  };

  const increase = (id) => {
    dispatch(increaseTheAmountOfProduct(id));
  };
  const decrease = (id) => {
    dispatch(decreaseTheAmountOfProduct(id));
  };

  const check = cart.find((el) => el._id === prod._id);

  return (
    <>
      <div className={styles.product_card} key={prod._id} data-id={prod._id}>
        <input
          type="checkbox"
          className={styles.card}
          name="card"
          checked={check ? check.isSelected : ''}
          onChange={(event) => soldCheckbox(event)}
        />
        {prod.discount > 0 && <div className={styles.badge}>{prod.discount}%</div>}
        <div className={styles.product_tumb}>
          <img src={prod.pictures} alt="" />
        </div>
        <div className={styles.product_details}>
          <span className={styles.product_catagory}>{prod.wight}</span>
          <div className={styles.name}>
            <p>{prod.name}</p>
          </div>
          <div className={styles.product_bottom_details}>
            <div className={styles.product_price}>
              <p className={styles.price}>{prod.price} р.</p>
              <span>{prod.stock} шт. осталось</span>
            </div>
            <div className={styles.product_links}>
              <button
                disabled={cartProd?.count === 1}
                className={styles.decr}
                onClick={() => decrease(prod._id)}>
                -
              </button>
              <p>
                {cart.map((el) => {
                  if (el._id === prod._id) return el.count;
                })}
              </p>
              <button
                disabled={cartProd?.count === prod.stock}
                className={styles.incr}
                onClick={() => increase(prod._id)}>
                +
              </button>
            </div>
          </div>
        </div>
        <button onClick={() => deleteProd(prod._id)} className={styles.delete}>
          Убрать товар из корзины
        </button>
      </div>
    </>
  );
};
