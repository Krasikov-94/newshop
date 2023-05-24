import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styles from '../../pages/Products/products.module.css';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchNewProduct } from '../../api/api';

export const AddNewProducts = ({ closeModal, token }) => {
  const addProdSchema = Yup.object().shape({
    name: Yup.string().required('Необходимо ввести'),
    description: Yup.string().required('Необходимо ввести'),
    price: Yup.number().positive().required('Необходимо ввести'),
    discount: Yup.number(),
    stock: Yup.number().positive().required('Необходимо ввести'),
    pictures: Yup.string().url().required('Необходимо ввести'),
    wight: Yup.string().required('Необходимо ввести'),
    // tags: [],
  });

  const initialValues = {
    name: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 1,
    pictures: '',
    wight: '',
  };

  const { mutate } = useMutation({
    mutationFn: async (values) => {
      const response = await fetchNewProduct(token, values);
      return response;
    },
    onSuccess() {
      toast.success('Товар добавлен');

      return closeModal();
    },
    onError(error) {
      return toast.error(error);
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    mutate(values);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={addProdSchema}>
        <Form className={styles.inputModal}>
          <div>
            <label htmlFor="name">Название</label>
            <Field id="name" name="name" placeholder="введите название" type="text" />
          </div>
          <div>
            <label htmlFor="description">Описание</label>
            <Field id="description" name="description" placeholder="введите описание" type="text" />
          </div>
          <div>
            <label htmlFor="discount">Скидка</label>
            <Field id="discount" name="discount" placeholder="введите скидку" type="number" />
          </div>
          <div>
            <label htmlFor="pictures">Фотография</label>
            <Field
              id="pictures"
              name="pictures"
              placeholder="введите ссылку на фотографию"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="price">Цена</label>
            <Field id="price" name="price" placeholder="введите цену" type="number" />
          </div>
          <div>
            <label htmlFor="stock">Количество</label>
            <Field id="stock" name="stock" placeholder="введите количество" type="text" />
          </div>
          <div>
            <label htmlFor="wight">Вес</label>
            <Field id="wight" name="wight" placeholder="введите вес товара" type="text" />
          </div>

          <button type="submit" className={styles.sub}>
            Создать
          </button>
        </Form>
      </Formik>
    </>
  );
};
