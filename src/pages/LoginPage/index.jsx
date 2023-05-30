// import { useMutation } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import style from './login.module.css';
import { TOKEN, logIn } from '../../utils/constants';
import ky from 'ky';
import { setUpUser } from '../../redux/slices/userSlices';
import { setAuth } from '../../redux/slices/authSlices';

const signSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Минимальная длина пароля 8 символов')
    .required('Пароль является обязательным'),
});

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth) return navigate('/login');
    dispatch(setAuth(false));
  }, [auth, dispatch, navigate]);

  const { mutateAsync } = useMutation({
    mutationFn: async (user) => {
      const res = await ky
        .post(logIn, { json: { email: user.email, password: user.password } })
        .json();
      localStorage.setItem(TOKEN, res.token);
      return res;
    },
    onSuccess: () => {
      dispatch(setAuth(true));
    },
  });

  const onSubmit = async (user) => {
    const response = await mutateAsync(user);
    dispatch(setAuth(true));
    dispatch(
      setUpUser({
        ...response.data,
        token: response.token,
      }),
    );
    navigate('/products');
  };

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <div className={style.wrapper}>
        <h1>Войти</h1>
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
              Войти
            </button>
          </Form>
        </Formik>
        <p>Если не зарегистрирован</p>
        <Link className={style.btn} to="/register">
          Зарегистрировать
        </Link>
      </div>
    </>
  );
};
