import dynamic from 'next/dynamic';
// third-party libraries like react-quill that directly access the DOM. It can access the document or window globals when the component mounts. On creating build it gives error 'document is not defined'. When we are using server side rendering there is no browser. Hence, there will not be any variable window or document. Hence this error shows up. Next.js allows us to dynamically import components and opt-out of server-side rendering (SSR). This can be particularly useful for components that rely on the browser environment.
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false, // This disables server-side rendering for this component
});
import 'react-quill/dist/quill.bubble.css';

type TextAreaProps = {
    formData: any;
    setFormData: any;
};

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
    ],
};

const TextArea = ({ formData, setFormData }: TextAreaProps): React.JSX.Element => {
    const onChangeHandler = (e: any): void => {
        if (e === '<p><br></p>') {
            setFormData({ ...formData, content: '' });
        } else {
            setFormData({ ...formData, content: e });
        }
    };

    return (
        <ReactQuill
            className="question-textarea"
            style={{ height: '65px' }}
            placeholder="Write something here..."
            theme="bubble"
            modules={modules}
            onChange={onChangeHandler}
            value={formData?.content}
        />
    );
};

export default TextArea;
