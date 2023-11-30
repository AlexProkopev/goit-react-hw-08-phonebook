import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { selectIsAutorization } from 'redux/authentification/authentification.selectors';

const PrivateRoute = ({children,navigateTo="/login"}) => {
    const authentification = useSelector(selectIsAutorization);
  return authentification ? children :  <Navigate to={navigateTo} replace/>;
}

export default PrivateRoute