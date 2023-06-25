import { Listing, Reservation, User } from '@prisma/client';
import React from 'react';
import { MODAL } from '@/app/modals';
import { IconType } from 'react-icons';


export type IUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}

export type IListing = Omit<Listing, 'createdAt'> & {
    createdAt: string
}

export type IListingWithUser = IListing & {
    user: IUser
}

export type IReservation = Omit<Reservation, 'createdAt' | 'startDate' | 'endDate'> & {
    createdAt: string
    startDate: string
    endDate: string
    listing: IListing
}

export interface UserDetailsResponse {
    data: {
        user: IUser | null
    };
}

export type ModalType = {
    [key in MODAL]: {
        component: React.FC
        title?: string
    }
};

export type RequestStatusType = 'idle' | 'isLoading' | 'success' | 'error'

export interface ICategory {
    label: string;
    name: string;
    icon: IconType;
    description: string;
}

export interface IAmenity {
    label: string;
    name: string;
    icon: IconType;
}

export type CategoryList = Record<string, ICategory>;

export type AmenityList = Record<string, IAmenity>;

export interface CloudinaryUploadResponse {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder: string;
    access_mode: string;
    original_filename: string;
}