import BtnComponent from 'components/BtnComponent/BtnComponent';
import IconLogOut from 'components/Layout/IconLogOut/IconLogOut';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOutThank } from 'redux/authentification/authentification.reduces';
import { selectUserData } from 'redux/authentification/authentification.selectors';
import css from "./ProfileInfo.module.css"
const ProfileInfo = () => {
    const {name} = useSelector(selectUserData);
    const dispatch = useDispatch();
  
    const hendlerClickLogout = () => {
      dispatch(logOutThank())
    }
  return (
    
    <div className={css.wrapperProfile}>
    <p className={css.textWithUser}>Hello <span className={css.userName}> {name}</span></p>
    <BtnComponent
     hendlerClick={hendlerClickLogout} classNames={"btnLogOut"}>
    <IconLogOut/>
   
    </BtnComponent>
  </div>
  )
}

export default ProfileInfo