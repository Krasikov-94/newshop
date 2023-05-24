import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';
import style from './layout.module.css';
import { useSelector } from 'react-redux';
import { HomePage } from '../../pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <div className={style.wrapper}>
        <Header className={style.header} />
        {!auth && <HomePage />}
        <Outlet className={style.outlet} />
        <Footer className={style.footer} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          limit={5}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};
