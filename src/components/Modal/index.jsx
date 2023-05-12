import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const ModalContent = ({ children, closeModal }) => {
  useEffect(() => {
    const listener = (event) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [closeModal]);

  return (
    <div className={styles.modal_content}>
      <button onClick={closeModal} className={styles.btn_close}>
        ✕
      </button>
      {children}
    </div>
  );
};

export const Modal = ({ isOpen = false, closeModal, children }) => {
  if (!isOpen) return null;

  const handleExit = (event) => {
    if (event.target === event.currentTarget) closeModal();
  };

  return createPortal(
    <div onClick={handleExit} className={styles.modal_wrapper}>
      <ModalContent closeModal={closeModal}>{children}</ModalContent>
    </div>,
    document.getElementById('modal'),
  );
};
