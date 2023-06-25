import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState, OpenModalProps } from './types';
import { RootState } from '../index';


const initialModalState: ModalState = {
    isOpen: false,
    currentModal: undefined,
    props: undefined,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        openModal: (state, action: PayloadAction<OpenModalProps>) => {
            state.isOpen = true;
            state.currentModal = action.payload.modal;
            state.props = action.payload.props;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.currentModal = undefined;
            state.props = undefined;
        },
    },
});

export const {
    openModal,
    closeModal,
} = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;
export const selectModalProps = (state: RootState) => state.modal.props;

export default modalSlice.reducer;