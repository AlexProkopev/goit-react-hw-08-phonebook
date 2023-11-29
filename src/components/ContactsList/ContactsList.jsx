
import BtnDeletedContact from 'components/BtnDeletedContact/BtnDeletedContact';
import { ModalContactsInfo } from 'components/ModalContactsInfo/ModalContactsInfo';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites, selectFilteredContacts } from 'redux/selectors';
import css from './ContactsList.module.css';
import { FavoriteIcon } from 'components/Contacts/FavoriteIcon/FavoriteIcon';
import {IsFavoriteBtnIcon } from 'components/Contacts/IsFavoriteBtnIcon/IsFavoriteBtnIcon';
import {
  addFavorites,
  addFavoritesThunk,
  deleteFavorites,
  deleteFavoritesThunk,
} from 'redux/favorites/favorites.reduces';
import { Notify } from 'notiflix';

import BtnComponent from 'components/BtnComponent/BtnComponent';



const ContactsList = () => {
  const getContacts = useSelector(selectFilteredContacts);
  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();

  const sortedContacts = [...getContacts].sort((a, b) => {
    const isAFavorite = favorites.some(favorite => favorite.name === a.name);
    const isBFavorite = favorites.some(favorite => favorite.name === b.name);

    if (isAFavorite && !isBFavorite) return -1;
    if (!isAFavorite && isBFavorite) return 1;

    return a.name.localeCompare(b.name);
  });

  

  const handleClickFavorites = async e => {
    const parrentButtonId = e.target.closest('li').dataset.id;
    const getContactsForId = getContacts.find(
      contact => contact.id === parrentButtonId
    );

   await dispatch(addFavoritesThunk(getContactsForId));
      dispatch(addFavorites(getContactsForId));
  };

  const handleClickFavoritesDelete = async e => {
    const parrentButtonId = e.target.closest('li').dataset.id;
    const getContactsForId = getContacts.find(
      contact => contact.id === parrentButtonId
    );
      const findFavorite = favorites.find(
        favorit => favorit.name === getContactsForId.name
      );
      
      try {
        await dispatch(deleteFavoritesThunk(findFavorite.id));
        dispatch(deleteFavorites(findFavorite.id));
        
      } catch (error) {
        Notify.failure(error.message);
      } 
}

  return (
    <>
      {sortedContacts.map(({ id, name, number }) => {
        const isFavorite = favorites.some(favorite => favorite.name === name);
        return (
          <li className={css.elemContacts} key={id} data-id={id}>
            <p className={css.contactText}>
              {name}: <span className={css.contactTextNumber}>{number}</span>
            </p>
            <div className={css.wrapperBtnModal}>
              {isFavorite ? (
                <BtnComponent hendlerClick={handleClickFavoritesDelete} classNames={"btnFavorites"}>
                  <IsFavoriteBtnIcon />
                </BtnComponent>
              ) : (
                <BtnComponent  hendlerClick={handleClickFavorites} classNames={"btnFavorites"}>
                  <FavoriteIcon />
                </BtnComponent>
              )}
              <ModalContactsInfo dataContacts={{ id, name, number }} />
              <BtnDeletedContact idCurrent={id} />
            </div>
          </li>
        );
      })}
    </>
  );
};


export default ContactsList;
