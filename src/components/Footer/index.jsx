import React from 'react';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './footer.module.css';

export const Footer = () => {
  const MockOneColumn = ['Каталог', 'Акция', 'Новости', 'Отзывы'];
  const MockTwoColumn = ['Оплата и доставка', 'Часто спрашивают', 'Обратная связь', 'Контакты'];
  const MockThreeColumn = ['Мы на связи', 'trololo@gmail.com', 'LOGO', '+7999000000'];

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <FontAwesomeIcon icon={faPaw} />
          <h1>DogFood</h1>
        </div>
        <div>
          <ul>
            {MockOneColumn.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {MockTwoColumn.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {MockThreeColumn.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
