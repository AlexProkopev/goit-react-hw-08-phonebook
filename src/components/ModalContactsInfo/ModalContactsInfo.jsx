import React, { useEffect, useState } from 'react';

import css from './ModalContactsInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';

import {  modalData } from 'redux/modal/modal.selectors';
import { setDataModal, setModalOpen } from 'redux/modal/modal.reducer';

import IconModalClose from './IconModalClose/IconModalClose';
import { updateThunk } from 'redux/authentification/services';
import { fetchContactsList } from 'redux/services';

export const ModalContactsInfo = () => {
  const {
    id: initialId,
    name: initialName,
    number: initialNumber,
  } = useSelector(modalData);


  const [name, setName] = useState(initialName);
  const [number, setNumber] = useState(initialNumber);

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedName = e.currentTarget.elements.name.value;
    const updatedNumber = e.currentTarget.elements.number.value;

    const contacts = {
      contact: {
        name: String(updatedName),
        number: String(updatedNumber),
      },
      id: String(initialId),
    };

    await dispatch(updateThunk(contacts));
    dispatch(fetchContactsList());
    dispatch(setModalOpen(false));
  };

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

  const handleOverlayClick = event => {
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
    <div className={css.overlayModal} onClick={handleOverlayClick}>
      <div className={css.modal} data-id={initialId}>
        <button className={css.btnClose} onClick={handleClickClose}>
          <IconModalClose />
        </button>
        <form className={css.form} onSubmit={handleSubmit}>
          <label htmlFor="name">Change name:</label>
            
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="number">Change number:</label>
          <input
            className={css.input}
            type="text"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            onChange={e => setNumber(e.target.value)}
          />
          <button className={css.btnSubmit} type="submit">
            Change
          </button>
        </form>
        <h2 className={css.modalTitle}>Name: {name}</h2>
        <p className={css.modalNumber}>Number: {number}</p>
      </div>
    </div>
  );
};
