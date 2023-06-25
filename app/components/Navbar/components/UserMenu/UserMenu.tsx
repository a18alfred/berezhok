'use client';

import styles from './UserMenu.module.scss';
import React, { useCallback, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '@/shared/components/Avatar/Avatar';
import MenuContent from '@/app/components/Navbar/components/MenuContent/MenuContent';
import useClickAway from '@/shared/hooks/useClickAway';
import useUser from '@/app/hooks/useUser';
import useModal from '@/app/hooks/useModal';

const UserMenu = () => {
    const { openNewAd, openLogin } = useModal();
    const { user } = useUser();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useClickAway(ref, () => {
        if (isOpen)
            setIsOpen(false);
    });

    const toggleOpen = useCallback(
        () => {
            setIsOpen(prev => !prev);
        },
        []);

    const onNewAd = useCallback(() => {
        if (!user) {
            return openLogin();
        }

        openNewAd();
    }, [openNewAd, user, openLogin]);

    return (
        <div
            ref={ref}
            className={styles.menu}
        >
            <div className={styles.menu__wrapper}>
                <button
                    className={styles.menu__button}
                    onClick={onNewAd}
                >
                    Разместить объявление
                </button>
                <div
                    onClick={toggleOpen}
                    className={styles.menu__burger}
                >
                    <AiOutlineMenu size={16} />
                    <div className={styles.menu__avatar}>
                        <Avatar src={user?.image} />
                    </div>
                </div>
                {isOpen && <MenuContent user={user} setIsOpen={setIsOpen} />}
            </div>
        </div>
    );
};

export default UserMenu;
