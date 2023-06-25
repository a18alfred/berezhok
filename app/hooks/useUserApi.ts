import { useAppDispatch, useAppSelector } from '@/shared/state/hooks';
import {
    getUserDetails,
    loginUser,
    registerUser,
    selectUserError,
    selectUserLoading,
} from '@/shared/state/user/slice';
import { LoginUserPayload, RegisterUserPayload } from '@/shared/state/user/types';

const useUserApi = () => {
    const isLoading = useAppSelector(selectUserLoading);
    const error = useAppSelector(selectUserError);
    const dispatch = useAppDispatch();

    const register = ({ data, callback }: RegisterUserPayload) => {
        dispatch(registerUser({
            data,
            callback,
        }));
    };

    const login = ({ provider, data, callback }: LoginUserPayload) => {
        dispatch(loginUser({
            provider,
            data,
            callback,
        }));
    };

    const getUser = () => {
        dispatch(getUserDetails({}));
    };

    return {
        isLoading,
        error,
        register,
        login,
        getUser,
    };
};

export default useUserApi;