'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'timeago.js';
import Markdown from 'markdown-to-jsx';

type BlogProps = {
    data?: any;
};

const ParticularBlogPage = ({ data }: BlogProps): JSX.Element => {
    const [blogData, setBlogData] = useState<any>({});
    const params = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:8000/api/blogs/${params?.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBlogData(res?.data);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

    return (
        <>
            {params?.id === blogData?._id ? (
                <div className="particular-card flex justify-center items-center">
                    <div className="card py-4 px-6 w-[36rem] h-[24rem] rounded-2xl">
                        <h2 className="card-title mb-4">{blogData?.title}</h2>
                        <p className="card-content text-[15px]">
                            <Markdown>{blogData?.content}</Markdown>
                        </p>
                        <p className="card-author text-[12px] mt-6">- {blogData?.author}</p>
                        <div className="card-date-container w-11/12 flex justify-end absolute bottom-2">
                            <p className="card-date text-[12px]">{format(blogData?.createdAt)}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="particular-card flex justify-center items-center">
                    <h1>Page Not Found</h1>
                </div>
            )}

            <style>{`
                .particular-card {
                    height: calc(100vh - 78px);
                    min-height: 600px;
                }
                .card {
                    position: relative;
                    margin: 1rem auto;
                    box-shadow: -8px -8px 10px rgba(255, 255, 255, 0.5), 8px 8px 10px rgba(94, 104, 121, 0.3);
                }
                .card-title {
                    color: var(--bg-color-dark-3);
                }
                .card-author {
                    color: var(--bg-color-dark-1);
                }
                .card-date {
                    color: var(--button-color);
                }
            `}</style>
        </>
    );
};

export default ParticularBlogPage;
