import Link from 'next/link';
import Button from './Button';
import { format } from 'timeago.js';
import Markdown from 'markdown-to-jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

type CardProps = {
    blog?: any;
    deleteBlogHandler?: any;
};

const Card = ({ blog, deleteBlogHandler }: CardProps): JSX.Element => {
    const { _id, title, content, author, createdAt } = blog;
    // const initialContent = content.substring(0, 160);

    return (
        <>
            <div className="card py-2 px-3 w-[21rem] h-[13rem] rounded-xl relative mb-4">
                <div className="flex justify-between">
                    <h4 className="card-title mb-2">{title}</h4>
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        size="xs"
                        style={{ color: 'rgb(192, 64, 0)', cursor: 'pointer' }}
                        onClick={() => deleteBlogHandler(_id)}
                    />
                </div>
                <p className="card-content text-[13px]">
                    <Markdown>{content}</Markdown>
                </p>
                <div className="card-date-container mt-2 flex justify-between">
                    <p className="card-author text-[10px]">- {author}</p>
                    <p className="card-date text-[10px]">{format(createdAt)}</p>
                </div>
                <Link href={`/blog/${_id}`} className="read-more absolute w-11/12 cursor-pointer">
                    <Button label="Read More" height="24px" width="80px" fontSize="11px" borderRadius="6px" />
                </Link>
            </div>

            <style>{`
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
                .read-more {
                    bottom: 0%;
                    left: 50%;
                    transform: translate(-15%, -50%);
                }
            `}</style>
        </>
    );
};

export default Card;
