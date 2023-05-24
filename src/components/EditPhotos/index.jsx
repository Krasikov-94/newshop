import React from 'react';
import { Formik, Field, Form } from 'formik';
import style from '../../pages/User/user.module.css';
export const EditPhotos = ({ onSubmit, setActiveAvatar }) => {
  return (
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
  );
};
