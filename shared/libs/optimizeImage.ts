import FileResizer from 'react-image-file-resizer';

export const optimizeImage = (file: File, callback: (uri: string) => void) => {
    FileResizer.imageFileResizer(
        file,
        2000,
        2000,
        'WEBP',
        100,
        0,
        (uri) => {
            callback(uri.toString());
        },
        'base64',
    );
};
