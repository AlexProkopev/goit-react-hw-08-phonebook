import FavoritesList from 'components/FavoritesList/FavoritesList'
import React, { useEffect } from 'react'
import css from "./Favorites.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites, selectFavoritesLoader } from 'redux/selectors';
import {IsFavoriteBtnIcon } from 'components/Contacts/IsFavoriteBtnIcon/IsFavoriteBtnIcon';
import Loader from 'components/Loader/Loader';
import { fetchFavoritesList } from 'redux/favorites/favorites.reduces';


const Favorites = () => {
    const favorites = useSelector(selectFavorites);
    const loader = useSelector(selectFavoritesLoader);
    const dispatch = useDispatch();
    useEffect(()=> {
dispatch(fetchFavoritesList());
    },[dispatch])

  return (
   <div>
    {loader && <Loader />}
    <h2 className={css.title}>Favorites contact <IsFavoriteBtnIcon /></h2>
    {favorites.length === 0 && <h3 className={css.textNotHave}>No have favorite contacts</h3>}
    {favorites.length > 0 && <ul className={css.listContacts}><FavoritesList/></ul>}
   </div>
  )
}

export default Favorites