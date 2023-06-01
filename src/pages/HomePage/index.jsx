import React from 'react';
import styles from './homepage.module.css';

export const HomePage = () => {
  return (
    <>
      <div className={styles.general}>
        <h1>Добро пожаловать в наш магазин</h1>
        <p>
          Давайте общаться, искать партнеров, дарить скидки, помогать, просить помощи! Мы ЗА любой
          формат продуктивного, полезного и честного нетворкинга с нами и нашими клиентами! Добро
          пожаловать в наш клуб - пространство для общения, нетворкинга и конструктивного
          взаимодействия!
        </p>
        <img
          src="https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ"
          alt=""
        />
      </div>
    </>
  );
};
