import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useDispatch } from 'react-redux';

import ErrorePage from 'pages/ErrorePage/ErrorePage';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import { HOME_PAGE, LOGIN_PAGE, PHONEBOOK_PAGE, REGISTRATION_PAGE } from './RoutesConstants/RoutesConstants';
import Loader from './Loader/Loader';
import { refreshThunk } from 'redux/authentification/services';

const HomePage = lazy(() => import('./Phonebook/Phonebook'));
const PhonebookPage = lazy(() => import('pages/PhonebookPages/PhonebookPages'));
const LoginPage = lazy(() => import('pages/Login/Login'));
const RegistrationPage = lazy(() => import('pages/Registration/Registration'));

const App = () => {
  const dispatch = useDispatch();

  const ROUTES = [
    {
      path: HOME_PAGE,
      element:  <PrivateRoute>
      <HomePage />
    </PrivateRoute>
    },
    {
      path: PHONEBOOK_PAGE,
      element:  <PrivateRoute>
      <PhonebookPage />
    </PrivateRoute>
    },
    {
      path: LOGIN_PAGE,
      element:  <RestrictedRoute>
      <LoginPage />
    </RestrictedRoute>
    },
    {
      path: REGISTRATION_PAGE,
      element:  <RestrictedRoute>
      <RegistrationPage />
    </RestrictedRoute>
    },
  ]

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
      <Routes>
        {ROUTES.map(({ path, element }) => {
          return (
            <Route key={path}
              path={path}
              element={element}
            />
          );
        })}
        <Route path="*" element={<ErrorePage />} />
      </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
