import React, { useEffect, useState } from 'react';
import styles from './cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  decreaseTheAmountOfProduct,
  deleteCart,
  deleteSelectedItems,
  increaseTheAmountOfProduct,
} from '../../redux/slices/cartSlices';
import { useQuery } from '@tanstack/react-query';
import { getProductsByIds } from '../../api/api';
import { PacmanLoader } from 'react-spinners';
import { TOKEN } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [count, setCount] = useState(
    cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0),
  );

  const [checked, addChecked] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token) navigate('/login');
  }, [navigate]);

  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getProductsByIds(cart.map((product) => product._id)),
  });

  if (isLoading) {
    return <PacmanLoader color="#000000" size={66} speedMultiplier={5} />;
  }

  const priceProd = data.map((el) => {
    const totalPrice = el.value.discount
      ? el.value.price - (el.value.price * el.value.discount) / 100
      : el.value.price;
    return totalPrice;
  });
  const sumProd = priceProd.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const deleteProd = (id) => {
    dispatch(deleteCart(id));
  };

  const increase = (id) => {
    dispatch(increaseTheAmountOfProduct(id));
    setCount(count + 1);
  };
  const decrease = (id) => {
    dispatch(decreaseTheAmountOfProduct(id));
    setCount(count - 1);
  };

  const soldCheckbox = (event) => {
    const chek = event.target.offsetParent;
    if (event.target.checked) {
      addChecked((oldArray) => [...oldArray, chek.dataset.id]);
    }
  };
  console.log(checked);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.as}>
          {data.length ? (
            <>
              <div>
                <button
                  onClick={() => dispatch(deleteSelectedItems(checked))}
                  className={styles.deleteAll}>
                  Delete selected items
                </button>
                <button onClick={() => dispatch(clearCart())} className={styles.deleteAll}>
                  DELETE ALL
                </button>
              </div>
            </>
          ) : (
            ''
          )}
          {data.length ? (
            data.map((prod, index) => (
              <>
                <div className={styles.product_card} key={index} data-id={prod.value._id}>
                  <input
                    type="checkbox"
                    className={styles.card}
                    name="card"
                    onChange={(event) => soldCheckbox(event)}
                  />
                  {prod.value.discount > 0 && (
                    <div className={styles.badge}>{prod.value.discount}%</div>
                  )}
                  <div className={styles.product_tumb}>
                    <img src={prod.value.pictures} alt="" />
                  </div>
                  <div className={styles.product_details}>
                    <span className={styles.product_catagory}>{prod.value.wight}</span>
                    <div className={styles.name}>
                      <p>{prod.value.name}</p>
                    </div>
                    <div className={styles.product_bottom_details}>
                      <div className={styles.product_price}>
                        <p className={styles.price}>{prod.value.price} р.</p>
                        <span>{prod.value.stock} шт. осталось</span>
                      </div>
                      <div className={styles.product_links}>
                        {cart.map((el) => {
                          if (el._id === prod.value._id) {
                            if (el.quantity < el.stock && el.quantity) {
                              return (
                                <>
                                  <button onClick={() => decrease(prod.value._id)}>-</button>
                                  {el.quantity}
                                  <button onClick={() => increase(prod.value._id)}>+</button>
                                </>
                              );
                            } else if (!el.quantity) {
                              return (
                                <>
                                  <button disabled onClick={() => decrease(prod.value._id)}>
                                    -
                                  </button>
                                  {el.quantity}
                                  <button onClick={() => increase(prod.value._id)}>+</button>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <button onClick={() => decrease(prod.value._id)}>-</button>
                                  {el.quantity}
                                  <button disabled onClick={() => increase(prod.value._id)}>
                                    +
                                  </button>
                                </>
                              );
                            }
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteProd(prod.value._id)} className={styles.delete}>
                    Убрать товар из корзины
                  </button>
                </div>
              </>
            ))
          ) : (
            <p>Товары еще не добавлены в корзину...</p>
          )}
        </div>
        {data.length > 0 && (
          <div className={styles.conditions}>
            <h1>Условия заказа</h1>
            <hr />
            <p>Итого:</p>
            <div className={styles.total}>
              <p>{count}шт.</p>
              <p>Цена:{sumProd}</p>
            </div>
            <button onClick={() => alert('Ура')}>Перейти к оформлению</button>
          </div>
        )}
      </div>
    </>
  );
};
