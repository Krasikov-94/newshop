import React, { useEffect, useState } from 'react';
import { TOKEN, allProducts } from '../../utils/constants';
import { useQuery } from '@tanstack/react-query';
import { CardList } from '../../components/CardList';
import { useDispatch } from 'react-redux';
import { getProd } from '../../redux/slices/productSlice';
import { PacmanLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Menu } from '../../components/Menu';
import { Modal } from '../../components/Modal';
import { Formik, Field, Form } from 'formik';
import { motion } from 'framer-motion';
import styles from './products.module.css';

export const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalState] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!token) navigate('/login');
  }, [navigate]);

  const token = localStorage.getItem(TOKEN);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getProducts'],
    queryFn: async () => {
      const res = await fetch(allProducts, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const responce = await res.json();
      dispatch(getProd(responce.products));
      return responce;
    },
  });

  if (isLoading) {
    return <PacmanLoader color="#000000" size={66} speedMultiplier={5} />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleOpenModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const onSubmit = async (values) => {
    console.log(values);
    closeModal();
  };

  return (
    <>
      {data ? (
        <>
          <div className={styles.wrapper}>
            <Menu handleOpenModal={handleOpenModal} />
            <div id="modal" className={styles.modal}></div>
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
              <div className={styles.modal}>
                <Formik
                  initialValues={{
                    name: '',
                    image: '',
                  }}
                  onSubmit={onSubmit}>
                  <Form>
                    <label htmlFor="name">name</label>
                    <Field name="name" placeholder="name" />
                    <label htmlFor="image">image</label>
                    <Field name="image" placeholder="image" />
                    <button type="submit" className={styles.sub}>
                      Submit
                    </button>
                  </Form>
                </Formik>
              </div>
            </Modal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <CardList />
            </motion.div>
          </div>
        </>
      ) : (
        <PacmanLoader color="#000000" size={66} speedMultiplier={5} />
      )}
    </>
  );
};
