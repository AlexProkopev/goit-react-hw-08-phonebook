import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  dataModal:null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalOpen(state, { payload }) {
        state.isModalOpen = payload;
    },
    setDataModal(state, { payload }) {
        state.dataModal = payload;
    }
  },
});

export const { setModalOpen,setDataModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
