'use client';

import styles from './ImageUpload.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const [uploadedImage, setUploadedImage] = useState<File | undefined>(undefined);
    const [src, setSrc] = useState<string>('');
    const handleImageInput = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();
        fileInput.addEventListener('change', () => {
            const reader = new FileReader();

            if (fileInput && fileInput.files) {
                setUploadedImage(fileInput.files[0]);
                onChange(URL.createObjectURL(fileInput.files[0]));
            }
        });
    };

    return (
        <div
            onClick={handleImageInput}
            className={styles.upload}
        >
            <TbPhotoPlus size={50} />
            <p className={styles.upload__text}>
                Click to upload
            </p>
            {value && (
                <div className={styles.upload__wrapper}>
                    <Image
                        fill
                        className={styles.upload__image}
                        src={value}
                        alt='Фото'
                    />

                </div>
            )}
        </div>
    );
};

export default ImageUpload;
