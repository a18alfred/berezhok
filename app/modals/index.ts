import { ModalType } from '@/shared/types/types';
import LoginModal from '@/app/modals/LoginModal/LoginModal';
import RegisterModal from '@/app/modals/RegisterModal/RegisterModal';
import ResetRequestModal from '@/app/modals/ResetRequestModal/ResetRequestModal';
import RentModal from '@/app/modals/RentModal/RentModal';
import ReservationModal from '@/app/modals/ReservationModal/ReservationModal';
import DeleteReservationModal from '@/app/modals/DeleteReservationModal/DeleteReservationModal';
import DeletePropertyModal from '@/app/modals/DeletePropertyModal/DeletePropertyModal';
import SearchModal from '@/app/modals/SearchModal/SearchModal';

export enum MODAL {
    LOGIN = 'login',
    REGISTER = 'register',
    RESET_REQUEST = 'reset_request',
    NEW_AD = 'new_ad',
    RESERVATION_CONFIRMATION = 'reservation_confirmation',
    DELETE_RESERVATION = 'delete_reservation',
    DELETE_PROPERTY = 'delete_property',
    SEARCH = 'search'
}

export const modals: ModalType = {
    [MODAL.LOGIN]: { component: LoginModal, title: 'Вход' },
    [MODAL.REGISTER]: { component: RegisterModal, title: 'Регистрация' },
    [MODAL.RESET_REQUEST]: { component: ResetRequestModal, title: 'Восстановление пароля' },
    [MODAL.NEW_AD]: { component: RentModal, title: 'Разместить объявление' },
    [MODAL.RESERVATION_CONFIRMATION]: { component: ReservationModal, title: 'Бронирование' },
    [MODAL.DELETE_RESERVATION]: { component: DeleteReservationModal, title: 'Отмена' },
    [MODAL.DELETE_PROPERTY]: { component: DeletePropertyModal, title: 'Удаление' },
    [MODAL.SEARCH]: { component: SearchModal, title: 'Поиск' },
};