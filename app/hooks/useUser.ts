import { useAppDispatch, useAppSelector } from '@/shared/state/hooks';
import { selectUserLoading, selectUserState, user_disconnected } from '@/shared/state/user/slice';

const useUser = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectUserLoading);
    const user = useAppSelector(selectUserState);

    const resetUser = () => {
        dispatch(user_disconnected());
    };

    return {
        isLoading,
        user,
        resetUser,
    };

};

export default useUser;