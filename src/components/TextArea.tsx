import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

type TextAreaProps = {
    formData?: any;
    setFormData?: any;
};

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
    ],
};

const TextArea = ({ formData, setFormData }: TextAreaProps): JSX.Element => {
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
