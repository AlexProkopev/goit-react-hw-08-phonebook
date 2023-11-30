import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./authentification/authentification.reduces";
import { Notify } from "notiflix";

export const fetchContactsList = createAsyncThunk(
    'contacts/getContacts',
    async (_, thunkApi) => {
      try {
        const { data } = await instance.get('/contacts');
        
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
        const { data } = await instance.delete(
          `/contacts/${id}`
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
        const { data } = await instance.post(
          `/contacts`,
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
  