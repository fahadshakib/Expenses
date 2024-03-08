import Compressor from 'compressorjs';

const compressImage = (file) => {

    return new Promise((resolve, reject) => {

        new Compressor(file, {
            maxWidth: 240,
            maxHeight: 240,
            quality: 0.8,

            success(result) {
                resolve(result);
            },

            error(error) {
                reject(error);
            }
        });
    });
};

export default compressImage;