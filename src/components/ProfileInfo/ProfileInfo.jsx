import BtnComponent from 'components/BtnComponent/BtnComponent';
import IconLogOut from 'components/Layout/IconLogOut/IconLogOut';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoading, selectUserData } from 'redux/authentification/authentification.selectors';
import css from "./ProfileInfo.module.css"
import Loader from 'components/Loader/Loader';
import { logOutThunk } from 'redux/authentification/services';
const ProfileInfo = () => {
    const {name} = useSelector(selectUserData);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

  
    const hendlerClickLogout = () => {
      dispatch(logOutThunk())
    }
  return (
    <>
    {isLoading && <Loader />}
    <div className={css.wrapperProfile}>
    <p className={css.textWithUser}>Hello <span className={css.userName}> {name}</span></p>
    <BtnComponent
     hendlerClick={hendlerClickLogout} classNames={"btnLogOut"}>
    <IconLogOut/>
   
    </BtnComponent>
  </div></>
  )
}

export default ProfileInfo