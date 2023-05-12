import React, { useEffect } from 'react';
import style from './favorites.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Favorites = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const a = auth;
    if (!a) navigate('/login');
  }, [auth, navigate]);

  return <div className={style.das}>{favorites}</div>;
};
