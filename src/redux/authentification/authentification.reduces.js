import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import axios from 'axios';


export const instance = axios.create({
  baseURL: `https://connections-api.herokuapp.com/`
})

const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const fetchUser = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
     const { data } = await instance.post('/users/login', formData);
     setToken(data.token);
     return data
    } catch (err) {
     
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const registrationUser = createAsyncThunk(
  'auth/registr',
  async (formData, thunkApi) => {
    try {
     const { data } = await instance.post('/users/signup', formData);
     setToken(data.token);
     return data
    } catch (err) {
     
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const  token  = state.authStore.token;
      setToken(token);
      console.log('token: ', token);
     const { data } = await instance.get('/users/current');
     console.log('data: ', data);
     
     return data
    } catch (err) {
     
      return thunkApi.rejectWithValue(err.message);
    }
    
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const  token  = state.authStore.token;
      if (!token) return false
      return true;
    }
  }
);

export const logOutThank = createAsyncThunk(
  'auth/logOut',
  async (_, thunkApi) => {
    try {
     const { data } = await instance.post('/users/logout');
     
     return data
    } catch (err) {
     
      return thunkApi.rejectWithValue(err.message);
    }
  }
);



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
        
      })
      .addCase(registrationUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authentifitacion = true;
        state.token = payload.token;
        state.userData = payload.user;
        
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authentifitacion = true;
        state.userData = payload
        
      })

      .addCase(logOutThank.fulfilled, () => {
        return initialState
        
      })
     
      .addMatcher(
        isAnyOf(fetchUser.pending,registrationUser.pending,refreshThunk.pending,logOutThank.pending),
        state => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchUser.rejected, registrationUser.rejected,refreshThunk.rejected,logOutThank.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.isError = payload;
        }
      ),
 
});

// export const { } = favoritesSlice.actions;

export const authentifitacionReduces = authentifitacionSlice.reducer;
