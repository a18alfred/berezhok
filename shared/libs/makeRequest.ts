import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export const makeRequest = ({
                                url = '/',
                                method = 'GET',
                                params = {},
                                data = {},
                                headers = {},
                            }: AxiosRequestConfig): AxiosPromise<any> => {
    return axios({ url, method, params, data, headers });
};
