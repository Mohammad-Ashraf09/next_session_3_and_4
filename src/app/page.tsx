'use client';
import Button from '@/components/Button';
import Card from '@/components/Card';
import FormInput from '@/components/FormInput';
import TextArea from '@/components/TextArea';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = (): React.JSX.Element => {
    const [blogData, setBlogData] = useState<any>([]);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const router = useRouter();

    // const [message, setMessage] = useState('hello newers, how are you?');
    // const [encrypted, setEncrypted] = useState('');
    // const [decrypted, setDecrypted] = useState('');
    // const [publicKey, setPublicKey] = useState('');

    useEffect(() => {
        const getData = async () => {
            // try {
            //     const res = await axios.get('https://dummyapi.online/api/blogposts');
            //     setBlogData(res?.data);
            // } catch (err) {
            //     console.log(err);
            // }

            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // const res = await axios.get('http://localhost:8000/api/blogs', {
                    const res = await axios.get(
                        'https://blog-backend-zeta-nine.vercel.app/api/blogs',
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setBlogData(
                        Object.values(res.data)?.sort((blog1, blog2) => {
                            return new Date(blog2.createdAt) - new Date(blog1.createdAt);
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                    if (error?.response?.status === 403) {
                        localStorage.removeItem('token');
                        router.push('/login');
                    }
                }
            } else {
                router.push('/login');
            }
        };
        getData();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (formData?.title?.length === 0 || formData?.content?.length === 0) {
            window.alert('Please fill empty field');
        } else {
            const isSubmit = window.confirm('Are you sure, you want to submit?');
            if (isSubmit) {
                const user = JSON.parse(localStorage?.getItem('user'));
                const blog = {
                    authorId: user?._id,
                    authorName: user?.name,
                    authorDP: user?.profilePicture,
                    title: formData?.title,
                    content: formData?.content,
                    // category: formData?.category,
                    category: 'other',
                };

                try {
                    const token = localStorage.getItem('token');
                    // const res = await axios.post('http://localhost:8000/api/blogs/create', blog, {
                    const res = await axios.post(
                        'https://blog-backend-zeta-nine.vercel.app/api/blogs/create',
                        blog,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setBlogData((prev: any) => [res?.data, ...prev]);
                    setFormData({ title: '', content: '' });
                } catch (error: any) {
                    console.log(error);
                }
            }
        }
    };

    const deleteBlogHandler = async (id: string) => {
        const isDelete = window.confirm('Are you sure, you want to Delete?');
        if (isDelete) {
            try {
                const token = localStorage.getItem('token');
                // const res = await axios.delete(`http://localhost:8000/api/blogs/delete/${id}`, {
                const res = await axios.delete(
                    `https://blog-backend-zeta-nine.vercel.app/api/blogs/delete/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBlogData(blogData?.filter((blog: any) => blog?._id !== res?.data?._id));
            } catch (error: any) {
                console.log(error);
            }
        }
    };

    const onChangeHandler = (e: any): void => {
        setFormData({ ...formData, title: e.target.value });
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     fetch('http://localhost:8000/api/enc/public-key', {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setPublicKey(data.publicKey))
    //         .catch((error) => console.error('Error fetching public key:', error));
    // }, []);

    // const handleEncrypt = async () => {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch('http://localhost:8000/api/enc/encrypt', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify({ message, publicKey })
    //     });
    //     const data = await response.json();
    //     setEncrypted(data.encrypted);
    // };

    // const handleDecrypt = async () => {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch('http://localhost:8000/api/enc/decrypt', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify({ encrypted })
    //     });

    //     if (response.ok) {
    //         const data = await response.json();
    //         setDecrypted(data.decrypted);
    //     } else {
    //         alert('Decryption failed or unauthorized');
    //     }
    // };
    // console.log({message, encrypted, decrypted})

    return (
        <>
            <div className="home-container h-full w-3/4 flex flex-col justify-center items-center">
                <form className="create-question-container w-full flex justify-center">
                    <div className="create-question w-2/3 h-auto flex items-end p-3 my-4 rounded-xl">
                        <div className="w-full mr-2">
                            <div className="w-1/2">
                                <FormInput
                                    name="title"
                                    type="text"
                                    placeholder="Enter title..."
                                    values={formData?.title}
                                    onChangeHandler={onChangeHandler}
                                />
                            </div>
                            <TextArea formData={formData} setFormData={setFormData} />
                        </div>
                        <div onClick={submitHandler}>
                            <Button
                                label="Submit"
                                height="24px"
                                width="80px"
                                fontSize="11px"
                                borderRadius="6px"
                            />
                        </div>
                    </div>
                </form>
                {/* <button onClick={handleEncrypt}>Encrypt</button>
                <button onClick={handleDecrypt}>Decrypt</button> */}
                <div className="home-container-wrapper w-full flex flex-wrap p-4 pt-0 overflow-auto">
                    {blogData?.map((blog: any) => (
                        <Card key={blog?._id} deleteBlogHandler={deleteBlogHandler} blog={blog} />
                    ))}
                </div>
            </div>
            <style>{`
                .create-question-container {
                    height: 160px;

                    .create-question {
                        background-color: var(--bg-color);
                        border-bottom: 2px solid var(--bg-color-dark-1);
                        
                        .question-textarea {
                            width: 100%;
                            background-color: var(--bg-color-light);
                            border-bottom: 1px solid var(--bg-color-dark-4);
                            border-radius: 4px;
                            font-size: 15px;
                            transition: 0.2s ease;
                            margin-top: -10px;
                        }
                        .ql-editor {
                            padding: 4px 8px;
                        }
                        .ql-editor::-webkit-scrollbar {
                            display: none;
                        }
                    }
                }
                .home-container-wrapper{
                    height: calc(100% - 160px);
                }
                .home-container-wrapper::-webkit-scrollbar{
                    display: none;
                }
            `}</style>
        </>
    );
};

export default Home;
