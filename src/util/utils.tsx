import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Compressor from 'compressorjs';
import { storage } from '@/firebase';

export const utils = {
    uploadImageToFirebase: (image: any, setValues: any, values: any) => {
        new Compressor(image, {
            quality: 0.4, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult: any) => {
                const imgName = compressedResult?.name?.toLowerCase()?.split(' ').join('-');
                const uniqueImageName = new Date().getTime() + '-' + imgName;

                const storageRef = ref(storage, uniqueImageName);
                const uploadTask = uploadBytesResumable(storageRef, compressedResult);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            default:
                                break;
                        }
                    },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setValues({ ...values, profilePicture: downloadURL });
                        });
                    }
                );
            },
        });
    },
};
