import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix';

export const fetchContactsList = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        'https://655ef6fa879575426b44404b.mockapi.io/contacts'
      );
      return data;
    } catch (err) {
      Notify.failure('Not connected to the server');
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `https://655ef6fa879575426b44404b.mockapi.io/contacts/${id}`
      );

      Notify.success('Contact deleted successfully');

      return data;
    } catch (err) {
      Notify.failure('Contact not deleted successfully');

      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    try {
      const { data } = await axios.post(
        `https://655ef6fa879575426b44404b.mockapi.io/contacts/`,
        contactData
      );
      Notify.success('Contact added successfully', { timeout: 1000 });
      return data;
    } catch (err) {
      Notify.failure('Contact not added successfully');
      return thunkApi.rejectWithValue(err.message);
    }
  }
);




const initialState = {
  contacts: [],
  contactsForId: [],
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
