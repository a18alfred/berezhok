import {
    UpdateFavoritePayload, UpdateFavoriteResult,
    FavoriteListingPayload,
    GetUserDetailsPayload,
    GetUserDetailsResult,
    LoginUserPayload,
    LoginUserResult,
    RegisterUserPayload,
    RegisterUserResult,
    UserState,
} from '@/shared/state/user/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, ThunkApi } from '@/shared/state';
import {
    getUserDetailsRequest,
    registerUserRequest, updateFavorites,
} from '@/app/requests/user';
import { signIn } from 'next-auth/react';
import { waitFor } from '@/shared/libs/waitFor';
import { IUser } from '@/shared/types/types';

const initialState: UserState = {
    isLoading: false,
    user: null,
    error: {
        login: null,
        register: null,
        other: null,
    },
};

let asyncDispatchCount = 0;

export const registerUser = createAsyncThunk<RegisterUserResult, RegisterUserPayload, ThunkApi>(
    'user/registerUser',
    async (props) => {
        const { data, callback } = props;
        await registerUserRequest(data);
        if (callback) callback();
    },
);

export const loginUser = createAsyncThunk<LoginUserResult, LoginUserPayload, ThunkApi>(
    'user/loginUser',
    async (props, { dispatch }) => {
        const { provider, data, callback } = props;

        const resp = await signIn(provider, {
            ...data,
            redirect: false,
        });
        if (resp?.status !== 200) throw new Error('Ошибка авторизации');
        await dispatch(getUserDetails({}));
        if (callback) callback();
    },
);

export const getUserDetails = createAsyncThunk<GetUserDetailsResult, GetUserDetailsPayload, ThunkApi>(
    'user/getUserDetails',
    async () => {
        const resp = await getUserDetailsRequest();

        if (!resp?.data?.user)
            return {
                user: null,
            };

        return {
            user: {
                ...resp.data.user,
            },
        };
    },
);

export const updateFavorite = createAsyncThunk<UpdateFavoriteResult, UpdateFavoritePayload, ThunkApi>(
    'user/updateFavorite',
    async (props, { getState }) => {
        const user = getState().user.user;
        if (!user) throw new Error('Пользователь не авторизован');
        const favoriteIds = user.favoriteIds;
        await waitFor(asyncDispatchCount * 600);
        await updateFavorites(favoriteIds);
        return {};
    },
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        user_connected: (state, action: PayloadAction<{ user: IUser }>) => {
            state.user = action.payload.user;
        },
        user_disconnected: () => initialState,
        add_favorite_listing: (state, action: PayloadAction<FavoriteListingPayload>) => {
            if (state.user) {
                state.user.favoriteIds.push(action.payload.listingId);
            }
        },
        delete_favorite_listing: (state, action: PayloadAction<FavoriteListingPayload>) => {
            if (state.user) {
                state.user.favoriteIds = state.user.favoriteIds.filter((item) => item !== action.payload.listingId);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = { ...state.error, register: null };
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                if (action.error.message?.includes('409'))
                    state.error = {
                        ...state.error,
                        register: 'Пользователь уже существует',
                    };
                else
                    state.error = {
                        ...state.error,
                        register: 'Ошибка при регистрации',
                    };
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = { ...state.error, login: null };
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.error = { ...state.error, login: 'Ошибка авторизации' };
            })
            .addCase(getUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = { ...state.error, other: null };
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(getUserDetails.rejected, (state) => {
                state.isLoading = false;
                state.error = { ...state.error, other: 'Что-то пошло не так!' };
            })
            .addCase(updateFavorite.pending, (state, action) => {
                asyncDispatchCount++;
                if (state.user) {
                    if (state.user.favoriteIds.includes(action.meta.arg.listingId))
                        state.user.favoriteIds = state.user.favoriteIds.filter((id) => id !== action.meta.arg.listingId);
                    else
                        state.user.favoriteIds.push(action.meta.arg.listingId);
                }
            })
            .addCase(updateFavorite.fulfilled, () => {
                asyncDispatchCount--;
            })
            .addCase(updateFavorite.rejected, (state, action) => {
                asyncDispatchCount--;
                if (state.user) {
                    if (state.user.favoriteIds.includes(action.meta.arg.listingId))
                        state.user.favoriteIds = state.user.favoriteIds.filter((id) => id !== action.meta.arg.listingId);
                    else
                        state.user.favoriteIds.push(action.meta.arg.listingId);
                }
            });
    },
});

export const {
    user_connected,
    add_favorite_listing,
    delete_favorite_listing,
    user_disconnected,
} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;

export const selectUserLoading = (state: RootState) => state.user.isLoading;

export const selectUserState = (state: RootState) => state.user.user;

export const selectUserError = (state: RootState) => state.user.error;

