'use client';

import styles from './MenuContent.module.scss';
import MenuItem from '@/app/components/Navbar/components/MenuItem/MenuItem';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React from 'react';
import { User } from '@prisma/client';
import useModal from '@/app/hooks/useModal';
import useUser from '@/app/hooks/useUser';
import { IUser } from '@/shared/types/types';

interface MenuContentProps {
    user: IUser | null,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuContent: React.FC<MenuContentProps> = ({ user, setIsOpen }) => {
    const router = useRouter();
    const { resetUser } = useUser();
    const { openLogin, openRegister, openNewAd } = useModal();

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {user ? (
                    <>
                        <MenuItem
                            label='Мои бронирования'
                            onClick={() => {
                                router.push('/reservations');
                                setIsOpen(false);
                            }}
                        />
                        <MenuItem
                            label='Избранное'
                            onClick={() => {
                                router.push('/favorites');
                                setIsOpen(false);
                            }}
                        />
                        <MenuItem
                            label='Мои объявления'
                            onClick={() => {
                                router.push('/properties');
                                setIsOpen(false);
                            }}
                        />
                        <MenuItem
                            label='Забронировано'
                            onClick={() => {
                                router.push('/orders');
                                setIsOpen(false);
                            }}
                        />
                        <MenuItem
                            label='Сдать жильё'
                            onClick={() => {
                                openNewAd();
                                setIsOpen(false);
                            }}
                        />
                        <hr />
                        <MenuItem
                            label='Выйти'
                            onClick={() => {
                                signOut();
                                resetUser();
                                setIsOpen(false);
                            }}
                        />
                    </>
                ) : (
                    <>
                        <MenuItem
                            label='Войти'
                            onClick={() => {
                                setIsOpen(false);
                                openLogin();
                            }}
                        />
                        <MenuItem
                            label='Зарегистрироваться'
                            onClick={() => {
                                setIsOpen(false);
                                openRegister();
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default MenuContent;
