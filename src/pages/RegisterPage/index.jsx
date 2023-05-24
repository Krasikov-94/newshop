import React, { useEffect } from 'react';
import style from './register.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TOKEN, regApi } from '../../utils/constants';
import { Field, Form, Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { setUpUser } from '../../redux/slices/userSlices';
import * as Yup from 'yup';

const signSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Минимальная длина пароля 8 символов')
    .required('Пароль является обязательным'),
});

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) navigate('/users');
  }, [navigate]);

  const { mutateAsync } = useMutation({
    mutationKey: 'user',
    mutationFn: async (user) => {
      const res = await fetch(regApi, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const response = await res.json();
      console.log(response);
      localStorage.setItem(TOKEN, response.token);
      return response;
    },
    onSuccess: () => {
      navigate('/products');
    },
  });

  const onSubmit = async (user) => {
    console.log(user);
    const response = await mutateAsync(user);
    dispatch(
      setUpUser({
        ...response.data,
        token: response.token,
      }),
    );
  };

  const initialValues = {
    email: '',
    password: '',
    group: 'group-11',
  };

  return (
    <>
      <div className={style.wrapper}>
        <h1>Регистрация</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={signSchema}>
          <Form className={style.form}>
            <div className={style.form_group}>
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" placeholder="Email" className={style.form_input} />
            </div>
            <div className={style.form_group}>
              <label htmlFor="password">Пароль</label>
              <Field
                id="password"
                name="password"
                placeholder="password"
                type="password"
                className={style.form_input}
              />
            </div>
            <button type="submit" className={style.btn}>
              Зарегестрировать
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};
