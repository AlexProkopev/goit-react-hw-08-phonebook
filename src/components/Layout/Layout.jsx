import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Layout.module.css';
import { useSelector } from 'react-redux';
import { selectIsAutorization} from 'redux/authentification/authentification.selectors';

import ProfileInfo from 'components/ProfileInfo/ProfileInfo';

const Layout = ({ children }) => {
  const autorization = useSelector(selectIsAutorization);
 
  return (
    <>
      <div className={css.navWrapper}>
        {autorization ? (
          <>
          <div className={css.linkWrapper}>
            <NavLink className={css.navLink} to="/favorites">
              Favorites contact
            </NavLink>
            <NavLink className={css.navLink} to="/phonebook">
              Phonebook
            </NavLink>
            
          </div>
          <div><ProfileInfo/></div>

          </>

        ) : (
          <>
            <NavLink className={css.navLink} to="/login">
              Log In
            </NavLink>
            <NavLink className={css.navLink} to="/registation">
              Registration
            </NavLink>
          </>
        )}
      </div>
      <div className={css.container}>{children}</div>
    </>
  );
};

export default Layout;
