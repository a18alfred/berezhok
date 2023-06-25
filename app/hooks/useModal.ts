import { useAppDispatch } from '@/shared/state/hooks';
import { closeModal, openModal } from '@/shared/state/modal/slice';
import { MODAL } from '@/app/modals';
import getFullAddress from '@/shared/libs/getFullAddress';

const useModal = () => {
    const dispatch = useAppDispatch();

    const close = () => {
        dispatch(closeModal());
    };

    const openLogin = () => {
        dispatch(openModal({ modal: MODAL.LOGIN }));
    };

    const openRegister = () => {
        dispatch(openModal({ modal: MODAL.REGISTER }));
    };

    const openResetRequest = () => {
        dispatch(openModal({ modal: MODAL.RESET_REQUEST }));
    };

    const openReservationConfirm = (props: {
        listingId: string
        listingTitle: string
        startDate: string
        endDate: string
        totalPrice: number
        fullAddress: string
    }) => {
        dispatch(openModal({ modal: MODAL.RESERVATION_CONFIRMATION, props }));
    };

    const openDeleteReservation = (props: { reservationId: string }) => {
        dispatch(openModal({ modal: MODAL.DELETE_RESERVATION, props }));
    };

    const openNewAd = () => {
        dispatch(openModal({ modal: MODAL.NEW_AD }));
    };

    const openSearch = () => {
        dispatch(openModal({ modal: MODAL.SEARCH }));
    };

    const openDeleteProperty = (props: { listingId: string }) => {
        dispatch(openModal({ modal: MODAL.DELETE_PROPERTY, props }));
    };

    return {
        close,
        openSearch,
        openLogin,
        openRegister,
        openResetRequest,
        openReservationConfirm,
        openDeleteReservation,
        openDeleteProperty,
        openNewAd,
    };
};

export default useModal;