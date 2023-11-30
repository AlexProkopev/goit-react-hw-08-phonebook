import React, { useEffect} from 'react';
import Modal from 'react-modal';
import css from './ModalContactsInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { modalData } from 'redux/modal/modal.selectors';
import { setDataModal, setModalOpen } from 'redux/modal/modal.reducer';
import BtnComponent from 'components/BtnComponent/BtnComponent';
import IconModalClose from './IconModalClose/IconModalClose';

Modal.setAppElement('#root');

export const ModalContactsInfo = dataContacts => {
  const { id, name, number } = useSelector(modalData);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        dispatch(setModalOpen(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const handleOverayClick = event => {
    if (event.target === event.currentTarget) {
      dispatch(setModalOpen(false));
      dispatch(setDataModal(null));
    }
  };

  const handleClickClose = () => {
    dispatch(setModalOpen(false));
    dispatch(setDataModal(null));
  };

  return (
    <div className={css.overlayModal} onClick={handleOverayClick}>
      <div className={css.modal} data-id={id}>
        <BtnComponent
          type="button"
          hendlerClick={handleClickClose}
          classNames="btnClose"
        >
          <IconModalClose />
        </BtnComponent>
        <h2 className={css.modalTitle}>{name}</h2>
        <p className={css.modalNumber}>{number}</p>
      </div>
    </div>
  );
};
