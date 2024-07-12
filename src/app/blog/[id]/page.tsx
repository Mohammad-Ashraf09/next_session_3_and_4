'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const ParticularBlogPage = () => {
    const [blogData, setBlogData] = useState({});
    const params = useParams();

    useEffect(() => {
        if (+params?.id > 0 && +params?.id < 51) {
            const getData = async () => {
                try {
                    const res = await axios.get('https://dummyapi.online/api/blogposts');
                    setBlogData(res?.data?.filter((data) => data?.id === +params?.id)[0]);
                } catch (err) {
                    console.log(err);
                }
            };
            getData();
        }
    }, []);

    return (
        <>
            {+params?.id > 0 && +params?.id < 51 ? (
                <div className="particular-card flex justify-center items-center">
                    <div className="card py-4 px-6 w-[36rem] h-[24rem] rounded-2xl">
                        <h2 className="card-title mb-4">{blogData?.title}</h2>
                        <p className="card-content text-[15px]">{blogData?.content}</p>
                        <p className="card-author text-[12px] mt-6">- {blogData?.author}</p>
                        <div className="card-date-container w-11/12 flex justify-end absolute bottom-2">
                            <p className="card-date text-[12px]">{blogData?.date_published}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="particular-card flex justify-center items-center">
                    <h1>Page Not Found</h1>
                </div>
            )}
        </>
    );
};

export default ParticularBlogPage;
