import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';
import style from './layout.module.css';
import { useSelector } from 'react-redux';
import { HomePage } from '../../pages/HomePage';

export const Layout = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  return (
    <>
      <div className={style.wrapper}>
        <Header className={style.header} />
        {!auth && <HomePage />}
        <Outlet className={style.outlet} />
        <Footer className={style.footer} />
      </div>
    </>
  );
};
