import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterContacts(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { filterContacts } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
