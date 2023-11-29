import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Favorites from 'pages/Favorites/Favorites';
import PhonebookPages from 'pages/PhonebookPages/PhonebookPages';
import Layout from './Layout/Layout';
import Registration from 'pages/Registration/Registration';
import Login from 'pages/Login/Login';
import { useDispatch } from 'react-redux';
import { refreshThunk } from 'redux/authentification/authentification.reduces';
import Errore from './Errore/Errore';
import ErrorePage from 'pages/ErrorePage/ErrorePage';

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
  
    dispatch(refreshThunk())
  },[dispatch])
  return (
   <Layout>
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/phonebook" element={<PhonebookPages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registation" element={<Registration />} />
        <Route path="*" element={<ErrorePage/>} />
      </Routes>
   </Layout>
  );
};

export default App;
