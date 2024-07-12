'use client';
import Card from '@/components/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('https://dummyapi.online/api/blogposts');
                setBlogData(res?.data);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

    return (
        <div className="home-container">
            <div className="home-container-wrapper flex flex-wrap">
                {blogData?.map((blog) => (
                    <Card key={blog?.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}
