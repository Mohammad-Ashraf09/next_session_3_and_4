'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import { format } from 'timeago.js';
import Markdown from 'markdown-to-jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Card = ({ blog, deleteBlogHandler }): JSX.Element => {
    const [partialHtmlString, setPartialHtmlString] = useState('');
    const { _id, authorId, authorName, authorDP, title, content, category, createdAt } = blog;

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        let wordCount = 0;
        let partialHtml = '';
        const count = 30;

        const traverseNodes = (node: any, count: number) => {
            if (wordCount >= count) return;

            if (node.nodeType === Node.TEXT_NODE) {
                const words = node.textContent.trim().split(/\s+/);
                if (wordCount + words.length > count) {
                    partialHtml += words.slice(0, count - wordCount).join(' ') + ' ';
                    partialHtml = partialHtml.trim() + ' ...';
                    wordCount = count;
                } else {
                    partialHtml += node.textContent + ' ';
                    wordCount += words.length;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.nodeName.toLowerCase();
                partialHtml += `<${tagName}`;

                Array.from(node.attributes).forEach((attr) => {
                    partialHtml += ` ${attr.name}="${attr.value}"`;
                });

                partialHtml += '>';
                node.childNodes.forEach((child) => traverseNodes(child, count));
                partialHtml += `</${tagName}>`;
            }
        };

        Array.from(doc.body.childNodes).forEach((child) => traverseNodes(child, count));

        setPartialHtmlString(partialHtml.trim());
    }, []);

    return (
        <>
            <div className="card py-2 px-3 rounded-xl relative">
                <div className="title-section flex justify-between">
                    <h4 className="title mb-2">{title}</h4>
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        size="xs"
                        style={{ color: 'rgb(192, 64, 0)', cursor: 'pointer' }}
                        onClick={() => deleteBlogHandler(_id)}
                    />
                </div>
                <div className="content-section flex flex-col justify-between py-2">
                    <p className="text-[13px]">
                        <Markdown>{partialHtmlString}</Markdown>
                    </p>
                    <div className="flex justify-between">
                        <p className="card-author">- {authorName}</p>
                        <p className="card-date">{format(createdAt)}</p>
                    </div>
                </div>
                <Link
                    href={`/blog/${_id}`}
                    className="read-more w-full flex justify-center items-center cursor-pointer"
                >
                    <Button
                        label="Read More"
                        height="24px"
                        width="80px"
                        fontSize="11px"
                        borderRadius="6px"
                    />
                </Link>
            </div>

            <style>{`
                .card {
                    width: 21rem;
                    height: 13rem;
                    margin: 1rem auto;
                    box-shadow: -8px -8px 10px rgba(255, 255, 255, 0.5), 8px 8px 10px rgba(94, 104, 121, 0.3);
                }
                .title-section {
                    height: 24px;
                }
                .title {
                    color: var(--bg-color-dark-3);
                }
                .content-section {
                    height: calc(100% - 48px);
                    font-size: 10px;
                }
                .card-author {
                    color: var(--bg-color-dark-1);
                    font-size: 10px;
                }
                .card-date {
                    color: var(--button-color);
                }
            `}</style>
        </>
    );
};

export default Card;
