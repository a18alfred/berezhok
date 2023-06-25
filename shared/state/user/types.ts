import { IReservation, IUser } from '@/shared/types/types';
import { LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { RegisterType } from '@/app/modals/RegisterModal/RegisterModal';
import { LoginType } from '@/app/modals/LoginModal/LoginModal';
import { Range } from 'react-date-range';

export interface UserState {
    isLoading: boolean,
    user: IUser | null,
    error: {
        login: string | null
        register: string | null
        other: string | null
    },
}

export interface RegisterUserPayload {
    data: RegisterType;
    callback?: () => void;
}

export interface RegisterUserResult {
}

export interface LoginUserPayload {
    provider: LiteralUnion<BuiltInProviderType>;
    data: LoginType;
    callback?: () => void;
}

export interface LoginUserResult {
}

export interface GetUserDetailsPayload {
}

export interface GetUserDetailsResult {
    user: IUser | null;
}

export interface FavoriteListingPayload {
    listingId: string;
}

export interface UpdateFavoritePayload {
    listingId: string;
}

export interface UpdateFavoriteResult {
}

