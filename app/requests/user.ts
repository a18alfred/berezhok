import { AxiosResponse } from 'axios';
import { makeRequest } from '@/shared/libs/makeRequest';
import { IUser } from '@/shared/types/types';
import { RegisterType } from '@/app/modals/RegisterModal/RegisterModal';

interface UserDetailsResponse {
    user: IUser | null;
}

export const getUserDetailsRequest = (): Promise<AxiosResponse<UserDetailsResponse>> => {
    return makeRequest({
        url: '/api/user/details',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const registerUserRequest = (newUser: RegisterType): Promise<AxiosResponse> => {
    return makeRequest({
        url: '/api/user/register',
        method: 'POST',
        data: newUser,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const verificationEmailRequest = (): Promise<AxiosResponse> => {
    return makeRequest({
        url: '/api/user/verify',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const resetRequest = (data: { email: string }): Promise<AxiosResponse> => {
    return makeRequest({
        url: '/api/user/forgot',
        method: 'POST',
        data: data,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const changePasswordRequest = (data: { password: string, token: string }): Promise<AxiosResponse> => {
    return makeRequest({
        url: '/api/user/reset',
        method: 'PUT',
        data: data,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const updateFavorites = (favoriteIds: string[]): Promise<AxiosResponse> => {
    return makeRequest({
        url: '/api/user/favorite',
        method: 'PUT',
        data: JSON.stringify({ favoriteIds }),
        headers: { 'Content-Type': 'application/json' },
    });
};