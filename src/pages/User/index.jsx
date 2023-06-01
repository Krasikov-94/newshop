import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './user.module.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PacmanLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/slices/userSlices';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { editPhoto, getUser } from '../../api/api';
import { EditPhotos } from '../../components/EditPhotos';

export const User = () => {
  const [activeAvatar, setActiveAvatar] = useState(false);

  const { token } = useAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['user', activeAvatar],
    queryFn: () => {
      return getUser(token);
    },
  });

  const { mutateAsync: editAvatar } = useMutation({
    mutationKey: 'avatar',
    mutationFn: (avatar) => {
      return editPhoto(avatar, token);
    },
    onSuccess: () => {
      toast.success('Аватар успешно изменен');
    },
  });

  const onSubmitAvatar = async (avatar) => {
    await editAvatar(avatar);
  };
  const exitBtn = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <>
      <div className={style.general}>
        <div className={style.wrapper}>
          <p className={style.p}>Личный кабинет</p>
          {data ? (
            <div className={style.content}>
              <div className={style.body}>
                <h1>{data.data.about}</h1>
                <p>Ваше имя: {data.data.name}</p>
                <p>Ваша группа: {data.data.group}</p>
                <p>Ваша почта: {data.data.email}</p>
                <p>Ваш id: {data.data._id}</p>
                <p>версия: {data.data.__v}</p>
              </div>
              <div>
                <img className={style.img} src={data.data.avatar} alt="dasd" />
                {activeAvatar ? (
                  <EditPhotos onSubmit={onSubmitAvatar} setActiveAvatar={setActiveAvatar} />
                ) : (
                  <button className={style.btn} onClick={() => setActiveAvatar(true)}>
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
      </div>
    </>
  );
};
