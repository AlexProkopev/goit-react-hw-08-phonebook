import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteFavoritesThunk, fetchFavoritesList } from 'redux/favorites/favorites.reduces';
import { selectFavorites } from 'redux/selectors';
import css from "./FavoritesList.module.css"
import { TrashIcon } from 'components/Contacts/TrashIcon/TrashIcon';
import { PhoneLogo } from 'components/Phonebook/PhoneLogo/PhoneLogo';

const FavoritesList = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesList());
  }, [dispatch]);

  const handleDeletedDavorite = async id => {
await dispatch(deleteFavoritesThunk(id));
dispatch(fetchFavoritesList());
  };

  const hadlerCallBtn = (e) => {
   
    const parrentButtonId = e.target.closest('li').dataset.id;
    const getContactsForId = favorites.find(
      contact => contact.id === parrentButtonId
    );
      const findFavorite = favorites.find(
        favorit => favorit.name === getContactsForId.name
      );
      
      return findFavorite.number
  }

  return (
    <>
      {favorites.map(({ id, name, number }) => {
        return (
          <li key={id} className={css.elemContacts} data-id={id}>
            <p className={css.contactText} >
              {name} : <span className={css.contactTextNumber}>{number}</span>
            </p>
            <div className={css.wrappertoBtn}>
            <a type="button" href={`tel:${number}`} className={css.btnCall} onClick={hadlerCallBtn}><PhoneLogo/></a>
            <button type="button" className={css.btnDeleteFavorite} onClick={()=> handleDeletedDavorite(id)}><TrashIcon/></button>
            
            </div>
          </li>
        );
      })}
    </>
  );
};

export default FavoritesList;
