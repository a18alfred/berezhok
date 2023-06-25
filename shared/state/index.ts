import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import modalReducer from './modal/slice';
import listingReducer from './listing/slice';

const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalReducer,
        listing: listingReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface ThunkApi {
    dispatch: AppDispatch;
    state: RootState;
}

export default store;