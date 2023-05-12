import React, { useEffect, useState } from 'react';
import { TOKEN, editAvatarApi, userApi } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import style from './user.module.css';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PacmanLoader } from 'react-spinners';
import { Formik, Field, Form } from 'formik';

export const User = () => {
  const [activeAvatar, setActiveAvatar] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem(TOKEN);
  useEffect(() => {
    if (!token) navigate('/login');
  }, [navigate, token, activeAvatar]);

  const getUser = async () => {
    const response = await axios.get(userApi, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  };

  const user = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  }).data;

  const editAvatarFunc = () => {
    setActiveAvatar(true);
  };

  const { mutateAsync: editAvatar } = useMutation({
    mutationKey: 'avatar',
    mutationFn: async (avatar) => {
      const res = await axios.patch(editAvatarApi, avatar, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return res;
    },
    onSuccess: () => {
      navigate('/user');
    },
  });

  const onSubmit = async (avatar) => {
    console.log(avatar);
    const response = await editAvatar(avatar);
    console.log(response);
  };

  const exitBtn = () => {
    localStorage.clear();
    navigate('/login');
  };
  console.log(activeAvatar);

  return (
    <>
      <div className={style.wrapper}>
        <p className={style.p}>Личный кабинет</p>
        {user ? (
          <div className={style.content}>
            <div className={style.body}>
              <h1>{user.about}</h1>
              <button className={style.btn}>Редактировать</button>
              <p>Ваше имя: {user.name}</p>
              <button className={style.btn}>Редактировать</button>
              <p>Ваша группа: {user.group}</p>
              <p>Ваша почта: {user.email}</p>
              <p>Ваш id: {user._id}</p>
              <p>версия: {user.__v}</p>
            </div>
            <div>
              <img className={style.img} src={user.avatar} alt="dasd" />
              {activeAvatar ? (
                <>
                  <Formik
                    initialValues={{
                      avatar: '',
                    }}
                    onSubmit={onSubmit}>
                    <Form className={style.form}>
                      <label htmlFor="avatar">Ссылка на картинку</label>
                      <Field id="avatar" name="avatar" className={style.form_input} />
                      <button type="submit">Установить</button>
                    </Form>
                  </Formik>
                  <button className={style.btn} onClick={() => setActiveAvatar(false)}>
                    Отменить
                  </button>
                </>
              ) : (
                <button className={style.btn} onClick={() => editAvatarFunc()}>
                  Редактировать
                </button>
              )}
            </div>
          </div>
        ) : (
          <PacmanLoader color="#000000" size={66} speedMultiplier={5} />
        )}
        <button className={style.exit} onClick={exitBtn}>
          Выйти
        </button>
      </div>
    </>
  );
};
