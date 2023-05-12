import React from 'react';
import style from './menu.module.css';

export const Menu = ({ handleOpenModal }) => {
  return (
    <div className={style.body}>
      <ul className={style.ul}>
        <li className={style.li}>
          <button className={style.btn}>Популярные</button>
        </li>
        <li className={style.li}>
          <button className={style.btn}>Новинки</button>
        </li>
        <li className={style.li}>
          <button className={style.btn}>Сначала дешевые</button>
        </li>
        <li className={style.li}>
          <button className={style.btn}>Сначала дорогие</button>
        </li>
        <li className={style.li}>
          <button className={style.btn}>По рейтингу</button>
        </li>
        <li className={style.li}>
          <button className={style.btn}>По скидке</button>
        </li>
      </ul>
      <button className={style.btn_add} onClick={() => handleOpenModal()}>
        + PRODUCTS
      </button>
    </div>
  );
};
