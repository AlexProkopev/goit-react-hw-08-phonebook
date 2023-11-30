import React, { useEffect } from 'react';
import css from './Contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { selectErrore, selectLoading } from 'redux/selectors';
import Loader from 'components/Loader/Loader';
import Errore from 'components/Errore/Errore';

import ContactsList from 'components/ContactsList/ContactsList';
import { fetchContactsList } from 'redux/services';

const Contacts = () => {
  const loader = useSelector(selectLoading);
  const errore = useSelector(selectErrore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsList());

    setInterval(() => {
      dispatch(fetchContactsList());
    }, 300000);
  }, [dispatch]);

  return (
    <div>
      {loader && <Loader />}

      {errore && <Errore />}
      <ul className={css.listContacts}>
        <ContactsList />
      </ul>
    </div>
  );
};

export default Contacts;
