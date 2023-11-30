import { createSelector } from '@reduxjs/toolkit';

export const selectcontatcs = store => store.contactsStore.contacts;

export const selectfilter = store => store.filtersStore.filter;

export const selectLoading = store => store.contactsStore.isLoading;

export const selectErrore = store => store.contactsStore.isError;

export const selectContactsForId = store => store.contactsStore.contactsForId;




export const selectFilteredContacts = createSelector(
  [selectfilter, selectcontatcs],
  (filter, contatcs) =>
    contatcs.filter((({name,number}) =>
    name.toLowerCase().includes(filter.toLowerCase().trim()) ||
    number.toString().includes(filter.toLowerCase().trim())
  )
    )
);
