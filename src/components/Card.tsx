import Link from 'next/link';
import React from 'react';
import Button from './Button';

const Card = ({ blog }) => {
    const { id, title, content, author, date_published } = blog;
    const initialContent = content.substring(0, 160);

    return (
        <div className="card py-2 px-3 w-[20rem] h-[13rem] rounded-xl relative">
            <h4 className="card-title mb-2">{title}</h4>
            <p className="card-content text-[13px]">{initialContent} ...</p>
            <div className="card-date-container mt-2 flex justify-between">
                <p className="card-author text-[10px]">- {author}</p>
                <p className="card-date text-[10px]">{date_published}</p>
            </div>
            <Link href={`/blog/${id}`} className="absolute w-11/12 bottom-3 cursor-pointer">
                <Button />
            </Link>
        </div>
    );
};

export default Card;
