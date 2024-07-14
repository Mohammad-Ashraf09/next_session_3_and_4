'use client';
import Button from '@/components/Button';
import Card from '@/components/Card';
import TextArea from '@/components/TextArea';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type HomeProps = {
    data?: any;
};

const Home = ({ data }: HomeProps): JSX.Element => {
    const [blogData, setBlogData] = useState<any>([]);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            // try {
            //     const res = await axios.get('https://dummyapi.online/api/blogposts');
            //     setBlogData(res?.data);
            // } catch (err) {
            //     console.log(err);
            // }

            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:8000/api/blogs', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBlogData(Object.values(res.data)?.sort((blog1, blog2)=>{
                    return new Date(blog2.createdAt) - new Date(blog1.createdAt);
                }));
            } catch (error: any) {
                console.log(error);
                if (error?.response?.status === 403) {
                    router.push('/login');
                }
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
                    author: user?.name,
                    title: formData?.title,
                    content: formData?.content,
                };

                try {
                    const token = localStorage.getItem('token');
                    await axios.post('http://localhost:8000/api/blogs/create', blog, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
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
                await axios.delete(`http://localhost:8000/api/blogs/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error: any) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="home-container h-full w-3/4 flex flex-col justify-center items-center">
                <div className="create-question-container w-full flex justify-center">
                    <div className="create-question w-2/3 h-auto flex items-end p-3 my-4 rounded-xl">
                        <TextArea formData={formData} setFormData={setFormData} />
                        <div onClick={submitHandler}>
                            <Button
                                type=""
                                label="Submit"
                                h="24px"
                                w="80px"
                                fs="11px"
                                round="6px"
                            />
                        </div>
                    </div>
                </div>
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
                            border: 2px solid var(--bg-color-dark-3);
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
