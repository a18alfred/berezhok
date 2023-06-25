'use client';

import React from 'react';
import Heading from '@/shared/components/Heading/Heading';
import styles from '../RentModal.module.scss';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
import { optimizeImage } from '@/shared/libs/optimizeImage';

interface ImageStepProps {
    uploadedImage: string | undefined;
    setUploadedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
    resetError: () => void;
}

const ImageStep: React.FC<ImageStepProps> = ({ uploadedImage, setUploadedImage, resetError }) => {
    const handleImageInput = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();
        fileInput.addEventListener('change', () => {
            if (fileInput && fileInput.files) {
                optimizeImage(fileInput.files[0], (uri) => {
                    setUploadedImage(uri);
                    resetError();
                });
            }
        });
    };

    return (
        <>
            <Heading
                title='Добавьте фотографию вашего места'
                subtitle='Красивая фотография может привлечь внимание'
                center
            />
            <div
                onClick={handleImageInput}
                className={styles.upload_wrapper}
            >
                {uploadedImage ? (
                    <div className={styles.image_wrapper}>
                        <Image
                            fill
                            className={styles.uploaded_image}
                            src={uploadedImage}
                            alt='Фото'
                        />
                    </div>
                ) : <>
                    <TbPhotoPlus size={50} />
                    <p className={styles.upload_text}>
                        Нажмите чтобы загрузить фото
                    </p>
                </>}
            </div>
        </>
    );
};

export default ImageStep;
