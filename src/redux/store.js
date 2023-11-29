import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts.reducer';
import { filtersReducer } from './filter/filter.deducer';
import { favoritesReducer } from './favorites/favorites.reduces';
import { authentifitacionReduces } from './authentification/authentification.reduces';


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const userConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    contactsStore: contactsReducer,
    filtersStore: filtersReducer,
    favoritesStore: favoritesReducer,
    authStore:persistReducer(userConfig, authentifitacionReduces) ,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

