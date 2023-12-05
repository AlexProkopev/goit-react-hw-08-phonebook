import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  dataModal:null,
  isLoading: false,
  textMessage: null
};

const modalMessageSlice = createSlice({
  name: 'modalMessage',
  initialState,
  reducers: {
    setModalMessageOpen(state, { payload }) {
        state.isModalOpen = payload;
    },
    setDataMessageModal(state, { payload }) {
        state.dataModal = payload;
    },
    setLoading(state, { payload }) {
        state.isLoading = payload;
    },
    setTextMessage(state, { payload }) {
        state.textMessage = payload;
    }
  },
});

export const { setModalMessageOpen,setDataMessageModal,setLoading,setTextMessage } = modalMessageSlice.actions;
export const modalMessageReducer = modalMessageSlice.reducer;
