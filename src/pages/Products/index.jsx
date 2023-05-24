import React, { useState } from 'react';
import { CardList } from '../../components/CardList';
import { Menu } from '../../components/Menu';
import { Modal } from '../../components/Modal';
import { motion } from 'framer-motion';
import styles from './products.module.css';
import { useAuth } from '../../hooks/useAuth';
import { AddNewProducts } from '../../components/AddNewProducts';

export const Products = () => {
  const { token } = useAuth();

  const [isModalOpen, setModalState] = useState(false);

  const handleOpenModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Menu handleOpenModal={handleOpenModal} />
        <div id="modal" className={styles.modal}>
          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <AddNewProducts closeModal={closeModal} token={token} />
          </Modal>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <CardList />
        </motion.div>
      </div>
    </>
  );
};
