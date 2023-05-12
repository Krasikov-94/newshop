import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import style from './header.module.css';
import { NavLink } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillChatSquareHeartFill } from 'react-icons/bs';
import { FaShoppingBasket } from 'react-icons/fa';
import { Search } from '../Search';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  return (
    <div className={style.header}>
      <div className={style.logoName}>
        <nav>
          <NavLink to={'/products'} className={({ isActive }) => (isActive ? style.active : '')}>
            <FontAwesomeIcon icon={faPaw} className={style.logo} />
          </NavLink>
        </nav>
        <h1>DogFood</h1>
      </div>
      {auth && (
        <>
          <Search />
          <div className={style.heartShopDog}>
            <nav>
              <NavLink to="/user" className={({ isActive }) => (isActive ? style.active : '')}>
                <BsFillPersonFill className={style.person} />
              </NavLink>
              <NavLink to="/favorites" className={({ isActive }) => (isActive ? style.active : '')}>
                <BsFillChatSquareHeartFill className={style.heart} />
              </NavLink>
              <span>{cart.length > 0 && cart.length}</span>
              <NavLink to="/cart">
                <FaShoppingBasket className={style.shop} />
              </NavLink>
            </nav>
          </div>
        </>
      )}
      {!auth && (
        <>
          <Link className={style.btn} to="/login">
            Войти
          </Link>
        </>
      )}
    </div>
  );
};
