import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import FormInput from './FormInput';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
    ],
};

const TextArea = ({ formData, setFormData }) => {
    const onChangeHandler = (e: any): void => {
        setFormData({ ...formData, title: e.target.value });
    };
    const onChangeHandler2 = (e: any): void => {
        setFormData({ ...formData, content: e });
    };

    return (
        <div className="w-full mr-2">
            <div className="w-1/2">
                <FormInput
                    name="title"
                    type="text"
                    placeholder="Enter title..."
                    values={formData?.title}
                    onChange={onChangeHandler}
                />
            </div>
            <ReactQuill
                className="question-textarea"
                style={{ minHeight: '65px' }}
                placeholder="Write something here..."
                theme="bubble"
                modules={modules}
                onChange={onChangeHandler2}
            />
        </div>
    );
};

export default TextArea;
