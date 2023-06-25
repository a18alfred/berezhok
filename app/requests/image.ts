import { AxiosResponse } from 'axios';
import { makeRequest } from '@/shared/libs/makeRequest';
import { CloudinaryUploadResponse } from '@/shared/types/types';

export const uploadImageToCloudinary = (formData: FormData): Promise<AxiosResponse<CloudinaryUploadResponse>> => {
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_MODE as string);
    return makeRequest({
        url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        method: 'POST',
        data: formData,
    });
};

export const deleteImageToCloudinary = (publicId: string): Promise<AxiosResponse> => {
    return makeRequest({
        url: `/api/image/details`,
        method: 'DELETE',
        data: {
            imageId: publicId,
        },
    });
};