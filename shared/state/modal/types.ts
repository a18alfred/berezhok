import { MODAL } from '@/app/modals';

export interface ModalState {
    isOpen: boolean;
    currentModal: MODAL | undefined;
    props: Record<string, any> | undefined;
}

export interface OpenModalProps {
    modal: MODAL;
    props?: Record<string, any>;
}