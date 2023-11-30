import {createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix';
import { fetchUser,logOutThunk, refreshThunk, registrationUser } from './services';

export const instance = axios.create({
  baseURL: `https://connections-api.herokuapp.com/`,
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const initialState = {
  userData: [],
  authentifitacion: false,
  token: null,
  isLoading: false,
  isError: null,
};

const authentifitacionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authentifitacion = true;
        state.token = payload.token;
        state.userData = payload.user;
        Notify.success("Log In successful");
      })
      .addCase(registrationUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authentifitacion = true;
        state.token = payload.token;
        state.userData = payload.user;
        Notify.success("Registration completed");
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authentifitacion = true;
        state.userData = payload;
        
      })

      .addCase(logOutThunk.fulfilled, () => {
        return initialState;
      })

      .addMatcher(
        isAnyOf(
          fetchUser.pending,
          registrationUser.pending,
          refreshThunk.pending,
          logOutThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchUser.rejected,
          registrationUser.rejected,
          refreshThunk.rejected,
          logOutThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.isError = payload;
          Notify.failure("This is an error");
        }
      ),
});


export const authentifitacionReduces = authentifitacionSlice.reducer;
