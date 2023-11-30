import {createSlice, isAnyOf } from '@reduxjs/toolkit';

import { deleteContactThunk, fetchContactsList } from './services';



const initialState = {
  contacts: [],
  isLoading: false,
  isError: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContacts(state, { payload }) {
      state.contacts.push(payload);
    },
    deleteContacts(state, { payload }) {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
    getContactsForId(state, { payload }) {
      state.contactsForId = state.contacts.find(contact => contact.id === payload);
    },
    
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContactsList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(fetchContactsList.pending, deleteContactThunk.pending),
        state => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchContactsList.rejected, deleteContactThunk.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.isError = payload;
        }
      ),
});

export const { addContacts, deleteContacts,getContactsForId } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
