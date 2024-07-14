'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
import PopupLayout from '@/components/popup/PopupLayout';
import { utils } from '@/util/utils';
import Button from '@/components/Button';
// import { REACT_APP_BASE_URL } from '@/config/keys';

type SignupProps = {
    data?: any;
};

const Signup = ({ data }: SignupProps): JSX.Element => {
    const defaultDP = '/assets/default-dp.png';
    const loader = '/assets/gif-loader.gif';
    const dummyDP = [
        '/assets/dummy-dp-01.png',
        '/assets/dummy-dp-02.png',
        '/assets/dummy-dp-03.png',
        '/assets/dummy-dp-04.png',
        '/assets/dummy-dp-05.png',
        '/assets/dummy-dp-06.png',
        '/assets/dummy-dp-07.png',
        '/assets/dummy-dp-08.png',
        '/assets/dummy-dp-09.png',
        '/assets/dummy-dp-10.png',
        '/assets/dummy-dp-11.png',
        '/assets/dummy-dp-12.png',
    ];

    const [disable, setDisable] = useState(true);
    const [currentDP, setCurrentDP] = useState(defaultDP);
    const [dpPreview, setDpPreview] = useState(null);
    const [isLoader, setIsLoader] = useState(false);
    const [hideSaveBtn, setHideSaveBtn] = useState(false);
    const [showTermsAndConditionsPopup, setShowTermsAndConditionsPopup] = useState(false);
    const router = useRouter();
    const [values, setValues] = useState<any>({
        name: '',
        gender: 'male',
        email: '',
        password: '',
        profilePicture: '',
    });

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            placeholder: 'Name',
            errorMsg: "Name should be 3-16 characters and shouldn't include any special character",
            pattern: '^[A-Z a-z]{3,16}$', // includes space also
            required: true,
        },
        {
            id: 2,
            name: 'gender',
            type: 'radio',
            placeholder: '',
        },
        {
            id: 3,
            name: 'email',
            type: 'text',
            placeholder: 'Email',
            errorMsg: 'It should be a valid email address!',
            pattern: '^(?=.*[.])(?=.*[@])(?=.*[a-z])[a-z0-9.@]{10,50}$',
            required: true,
        },
        {
            id: 4,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMsg:
                'Password should be 8-20 character and include at least 1 capital letter, 1 number and 1 special character!',
            pattern: '^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$',
            required: true,
        },
    ];

    const disableHandler = () => {
        setDisable(!disable);
    };

    const onChangeHandler = (e: any): void => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const dpHandler = (dp) => {
        setCurrentDP(dp);
        setDpPreview(null);
    };

    const dpFromGalleryHandler = (e) => {
        if (e.target.files[0]) {
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setDpPreview(objectUrl);
            setCurrentDP(e.target.files[0]);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoader(true);
        setHideSaveBtn(true);

        if (typeof currentDP === 'string') {
            const arr = currentDP.split('/');
            setValues({ ...values, profilePicture: arr[arr.length - 1] });
        } else {
            utils.uploadImageToFirebase(currentDP, setValues, values);
        }
    };

    useEffect(() => {
        // this useEffect is real submit handler
        if (values?.profilePicture) {
            const saveDetailsToDB = async () => {
                try {
                    await axios.post(`http://localhost:8000/api/auth/register`, values);
                    setIsLoader(false);
                    setHideSaveBtn(false);
                    router.push('/login');
                } catch (err) {
                    console.log(err);
                }
            };
            saveDetailsToDB();
        }
    }, [values?.profilePicture]);

    useEffect(() => {
        const isTokenExist = localStorage.getItem('token');
        if (isTokenExist) {
            router.push('/');
        }
    }, []);

    const blurrScreenHandler = () => {
        setShowTermsAndConditionsPopup(!showTermsAndConditionsPopup);

        if (!showTermsAndConditionsPopup) {
            document.body.style.overflow = 'hidden';
            document.body.scrollIntoView();
        } else document.body.style.overflow = 'auto';
    };

    return (
        <>
            <div className="signup-container flex rounded-xl">
                <form className="signup-left p-10 h-full relative" onSubmit={submitHandler}>
                    <h1 className="mb-6 text-2xl font-bold">Sign Up</h1>
                    {inputs.map((item) => (
                        <FormInput
                            key={item.id}
                            name={item.name}
                            type={item.type}
                            placeholder={item.placeholder}
                            errorMsg={item.errorMsg}
                            pattern={item.pattern}
                            required={item.required}
                            values={values[item.name]}
                            onChange={onChangeHandler}
                        />
                    ))}
                    <div className="flex items-center">
                        <input
                            className="agreement-check"
                            type="checkbox"
                            name="agreement"
                            onClick={disableHandler}
                        />
                        <label htmlFor="agreement">
                            I agree to all statements in&nbsp;
                            <span
                                style={{
                                    color: '#417af5',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                                onClick={blurrScreenHandler}
                            >
                                Terms and Conditions
                            </span>
                        </label>
                    </div>

                    <div className="navigations flex justify-between items-end mt-12">
                        {!hideSaveBtn ? (
                            <Button type="submit" label="Register" isDisabled={disable} />
                        ) : null}
                        {isLoader ? (
                            <div className="loader-button">
                                <Image
                                    className="loader"
                                    src={loader}
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                            </div>
                        ) : null}
                        <Link href="/login" className="existing-member">
                            Already a Member?
                        </Link>
                    </div>
                </form>

                <div className="vertical-line"></div>

                <div className="signup-right h-full p-8">
                    <div className="flex justify-center">
                        <div className="profile-picture-container flex justify-center mb-6 mt-4">
                            {dpPreview ? (
                                <Image
                                    className="rounded-[50%] object-cover"
                                    src={dpPreview}
                                    width={180}
                                    height={180}
                                    alt="profile"
                                />
                            ) : (
                                <Image
                                    className="rounded-[50%] object-cover"
                                    src={currentDP}
                                    width={180}
                                    height={180}
                                    alt="profile"
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap mt-2 mb-10">
                        {dummyDP?.map((data, i) => (
                            <div
                                key={i}
                                className="mr-2 mb-1 cursor-pointer"
                                onClick={() => dpHandler(data)}
                            >
                                <Image src={data} width={50} height={50} alt="" />
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-between">
                        <label htmlFor="dp">
                            <div className="choose-from-gallery">Choose From Gallery</div>
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                id="dp"
                                name="file"
                                accept=".jpg, .png, .jpeg"
                                onChange={dpFromGalleryHandler}
                            />
                        </label>

                        <div
                            className="choose-from-gallery"
                            onClick={() => {
                                setCurrentDP(defaultDP);
                                setDpPreview(null);
                            }}
                        >
                            Remove DP
                        </div>
                    </div>
                </div>
            </div>

            {showTermsAndConditionsPopup && (
                <div className="blurr-div w-full flex justify-center items-center absolute">
                    <PopupLayout
                        blurrScreenHandler={blurrScreenHandler}
                        popup="TermsAndConditionsPopup"
                        height={window.innerWidth <= 420 ? '240px' : '400px'}
                        width={window.innerWidth <= 420 ? '96%' : '600px'}
                    />
                </div>
            )}
            <style jsx>{`
                .signup-container {
                    height: 440px;
                    width: 55%;
                    // background: rgb(244, 240, 240);
                    background: var(--bg-color);
                    box-shadow: 4px 4px 10px var(--shadow-color);

                    .signup-left {
                        box-sizing: border-box;
                        width: 49.8%;

                        h1 {
                            color: var(--bg-color-dark-4);
                        }
                        .agreement-check {
                            height: 12px;
                            width: 12px;
                            margin-right: 4px;
                        }
                        label {
                            font-size: 11px;
                        }
                        .loader-button {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 36px;
                            width: 120px;
                            border-radius: 25px;
                            background-color: var(--button-shadow);
                            cursor: not-allowed;
                        }
                        .existing-member {
                            color: var(--bg-color-dark-2);
                            font-size: 11px;
                        }
                        .existing-member:hover {
                            color: var(--bg-color-dark-4);
                        }
                    }
                    .vertical-line {
                        width: 0.4%;
                        height: 400px;
                        margin-top: 22px;
                        background-color: var(--bg-color-dark-4);
                        border-radius: 2px;
                    }
                    .signup-right {
                        box-sizing: border-box;
                        width: 49.8%;

                        .profile-picture-container {
                            height: 180px;
                            width: 180px;
                        }
                        .choose-from-gallery {
                            font-size: 11px;
                            color: var(--bg-color-dark-2);
                            text-decoration: underline;
                            cursor: pointer;
                        }
                        .choose-from-gallery:hover {
                            color: var(--bg-color-dark-4);
                        }
                    }
                }
                .blurr-div {
                    background-color: rgba(21, 21, 21, 0.95);
                    height: calc(100% + 92px);
                    z-index: 99;
                }
            `}</style>
        </>
    );
};

export default Signup;
