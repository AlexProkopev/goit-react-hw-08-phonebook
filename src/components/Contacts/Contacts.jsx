import React, { useEffect } from 'react';
import css from './Contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsList } from 'redux/contacts.reducer';
import {
  selectErrore,
  selectFavoritesLoader,
  selectLoading,
} from 'redux/selectors';
import Loader from 'components/Loader/Loader';
import Errore from 'components/Errore/Errore';

import {
  fetchFavoritesList,
} from 'redux/favorites/favorites.reduces';

import ContactsList from 'components/ContactsList/ContactsList';

const Contacts = () => {
  const loader = useSelector(selectLoading);
 
  const errore = useSelector(selectErrore);
  const dispatch = useDispatch();
  const loaderFavorites = useSelector(selectFavoritesLoader);

  useEffect(() => {
    dispatch(fetchFavoritesList());
    dispatch(fetchContactsList());
    setInterval(() => {
      dispatch(fetchContactsList());
    }, 300000);
  }, [dispatch]);

  return (
    <div>
      {loader  && <Loader />}
      {loaderFavorites && <Loader />}
      {errore && <Errore />}
      <ul className={css.listContacts}>
        <ContactsList/>
      </ul>
    </div>
  );
};

export default Contacts;
