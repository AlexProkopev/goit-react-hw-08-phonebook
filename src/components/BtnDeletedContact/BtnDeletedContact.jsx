import { TrashIcon } from 'components/Contacts/TrashIcon/TrashIcon';
import React from 'react';
import { useDispatch } from 'react-redux';
import css from './BtnDeletedContact.module.css';
import { Notify } from 'notiflix';
import { deleteContactThunk, fetchContactsList } from 'redux/services';
import { setModalOpen } from 'redux/modal/modal.reducer';

const BtnDeletedContact = ({ idCurrent }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = async id => {
    try {
      await dispatch(deleteContactThunk(id));
      dispatch(setModalOpen(false))
      dispatch(fetchContactsList());
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <button
      className={css.btnContacts}
      type="button"
      onClick={() => {
        handleDeleteContact(idCurrent);
      }}
    >
      <TrashIcon />
    </button>
  );
};

export default BtnDeletedContact;
