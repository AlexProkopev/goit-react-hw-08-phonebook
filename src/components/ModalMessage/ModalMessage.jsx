import React, { useEffect} from 'react';
import css from './ModalMessage.module.css';
import {
  isLoadingMessage,
  modalMessageData,
} from 'redux/modalMessage/modalMessage.selectors';
import { useDispatch, useSelector } from 'react-redux';
import BtnComponent from 'components/BtnComponent/BtnComponent';
import IconModalClose from 'components/ModalContactsInfo/IconModalClose/IconModalClose';
import {
  setDataMessageModal,
  setLoading,
  setModalMessageOpen,
  setTextMessage,
} from 'redux/modalMessage/modalMessage.reducer';
import Loader from 'components/Loader/Loader';
import { Notify } from 'notiflix';

const ModalMessage = () => {
  const { name: initialName } = useSelector(modalMessageData);
  const isLoading = useSelector(isLoadingMessage);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setModalMessageOpen(false));
    dispatch(setDataMessageModal(null));
  };

  const hendlerSendMessage = e => {
    e.preventDefault();

    const textMessageValue = e.currentTarget.elements.textMessage.value;

    dispatch(setLoading(true));
    e.currentTarget.reset();

    setTimeout(() => {
      try {
        dispatch(setLoading(false));
        dispatch(setTextMessage(`${textMessageValue} for ${initialName}!`));
        Notify.success('Message sent');
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    }, 1000);
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        dispatch(setModalMessageOpen(false));
        dispatch(setDataMessageModal(null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      dispatch(setModalMessageOpen(false));
      dispatch(setDataMessageModal(null));
    }
  };

  return (
    <div className={css.overlayModal} onClick={handleOverlayClick}>
      {isLoading && <Loader />}
      <div className={css.modal}>
        <h2 className={css.titleMessageModal}>
          Write message for <span className={css.spanName}>{initialName}</span>
        </h2>
        <form className={css.formMessage} onSubmit={hendlerSendMessage}>
          <textarea
            name="textMessage"
            placeholder="Starting to write message..."
            className={css.messageContent}
            required
          ></textarea>
          <button type="submit" className={css.sendMessageBtn}>
            Send message
          </button>
        </form>
        <BtnComponent classNames={'btnCloseMessage'} hendlerClick={closeModal}>
          <IconModalClose />
        </BtnComponent>
      </div>
    </div>
  );
};

export default ModalMessage;
