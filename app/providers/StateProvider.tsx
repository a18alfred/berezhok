'use client';

import { Provider } from 'react-redux';
import store from '@/shared/state';
import React, { useEffect } from 'react';
import { IUser } from '@/shared/types/types';
import { useAppDispatch } from '@/shared/state/hooks';
import { user_connected } from '@/shared/state/user/slice';

const StateProvider = ({ children, user }: { children: React.ReactNode, user: IUser | null }) => {
    return (
        <Provider store={store}>
            <UserUpdater user={user} />
            {children}
        </Provider>
    );
};

export default StateProvider;

const UserUpdater = ({ user }: { user: IUser | null }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) dispatch(user_connected({ user }));
    }, [user, dispatch]);

    return null;
};
