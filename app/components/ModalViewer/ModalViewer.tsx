'use client';

import React from 'react';
import { useAppSelector } from '@/shared/state/hooks';
import { selectModal } from '@/shared/state/modal/slice';
import useModal from '@/app/hooks/useModal';
import { modals } from '@/app/modals';
import styles from './ModalViewer.module.scss';
import { IoMdClose } from 'react-icons/io';


const ModalViewer = () => {
    const { currentModal } = useAppSelector(selectModal);
    const { close } = useModal();

    if (!currentModal) return null;

    const CurrentModal = modals[currentModal].component;
    const title = modals[currentModal].title;


    return (
        <div className={styles.modal}>
            <div className={styles.modal__wrapper}>
                <div className={styles.modal__content}>
                    <div className={styles.content__wrapper}>

                        <div className={styles.content__header}>
                            <h4>
                                {title}
                            </h4>
                            <button onClick={close}>
                                <IoMdClose size={18} />
                            </button>
                        </div>

                        <div className={styles.content__body}>
                            <CurrentModal />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalViewer;