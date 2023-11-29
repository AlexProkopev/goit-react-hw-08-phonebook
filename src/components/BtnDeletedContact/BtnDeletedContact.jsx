import { TrashIcon } from 'components/Contacts/TrashIcon/TrashIcon';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContactThunk, fetchContactsList } from 'redux/contacts.reducer';
import css from "./BtnDeletedContact.module.css";

const BtnDeletedContact = ({ idCurrent }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteContact = async id => {
    setIsDeleting(true);
    await dispatch(deleteContactThunk(id));
    dispatch(fetchContactsList());
  };

  return (
    <button
      className={`${css.btnContacts} ${isDeleting ? css.btnDeleting : ''}`}
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