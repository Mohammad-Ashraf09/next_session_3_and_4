'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
// import { REACT_APP_BASE_URL } from '../config/keys';

type LoginProps = {
    data?: any;
};

const Login = ({ data }: LoginProps): React.JSX.Element => {
    const [invalidCredential, setInvalidCredential] = useState(false);
    const [values, setValues] = useState<any>({ email: '', password: '' });
    const router = useRouter();
    const inputs = [
        {
            id: 1,
            name: 'email',
            type: 'text',
            placeholder: 'Email',
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
        },
    ];

    const onChangeHandler = (e: any): void => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setInvalidCredential(false);
    };

    const submitHandler = async (e: any) => {
        e.preventDefault();
        try {
            if (values.email?.length > 0 && values.password?.length > 0) {
                // const response = await axios.post(`http://localhost:8000/api/auth/login`, values);
                const response = await axios.post(
                    `https://blog-backend-zeta-nine.vercel.app/api/auth/login`,
                    values
                );
                localStorage.setItem('token', response?.data.accessToken);
                localStorage.setItem('user', JSON.stringify(response?.data.other));
                router.push('/');
            }
        } catch (err) {
            setInvalidCredential(true);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, []);

    return (
        <>
            <form
                className="login-container flex flex-col items-center pt-10 px-20 relative rounded-xl"
                onSubmit={submitHandler}
            >
                <h1 className="mb-6 text-2xl font-bold">Login</h1>
                {inputs.map((item) => (
                    <FormInput
                        key={item.id}
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                        values={values[item.name]}
                        onChangeHandler={onChangeHandler}
                    />
                ))}
                {invalidCredential && (
                    <div className="invalid-credential">Invalid Credentials!</div>
                )}

                <div className="w-full flex justify-between text-[10px]">
                    <div className="flex items-center">
                        <input className="h-3 w-3 mr-1" type="checkbox" />
                        <label className="texts"> Remember Me </label>
                    </div>
                    <div className="texts"> Forgot Password? </div>
                </div>

                <div className="mt-16">
                    <Button label="Login" width="140px" />
                </div>
                <Link href="/signup" className="">
                    <p className="texts my-2 text-[10px]">don&apos;t have account?</p>
                </Link>
            </form>

            <style jsx>{`
                .login-container {
                    height: 400px;
                    width: 32%;
                    background: var(--bg-color);
                    box-shadow: 4px 4px 10px var(--shadow-color);

                    h1 {
                        color: var(--bg-color-dark-4);
                    }
                    .invalid-credential {
                        color: red;
                        margin-bottom: 2rem;
                        font-size: 14px;
                    }
                    .texts {
                        color: var(--bg-color-dark-2);
                        cursor: pointer;
                    }
                    .texts:hover {
                        color: var(--bg-color-dark-4);
                    }
                }
            `}</style>
        </>
    );
};

export default Login;
