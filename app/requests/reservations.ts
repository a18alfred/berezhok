import { AxiosResponse } from 'axios';
import { makeRequest } from '@/shared/libs/makeRequest';

interface CreateReservationProps {
    totalPrice: number;
    startDate: Date;
    endDate: Date;
    listingId: string;
}

export const createReservation = ({
                                      totalPrice,
                                      startDate,
                                      endDate,
                                      listingId,
                                  }: CreateReservationProps): Promise<AxiosResponse> => {
    const requestData = {
        totalPrice,
        startDate,
        endDate,
        listingId,
    };
    return makeRequest({
        url: `/api/reservation`,
        method: 'POST',
        data: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const deleteReservation = (reservationId: string): Promise<AxiosResponse> => {
        return makeRequest({
            url: `/api/reservation/${reservationId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
;