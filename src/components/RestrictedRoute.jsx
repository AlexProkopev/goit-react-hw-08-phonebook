import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { selectIsAutorization } from 'redux/authentification/authentification.selectors';

const RestrictedRoute = ({children,navigateTo="/phonebook"}) => {
    const authentification = useSelector(selectIsAutorization);
  return authentification ? <Navigate to={navigateTo} replace/> : children;
}

export default RestrictedRoute