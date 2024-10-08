'use client';
import { useState } from 'react';

type FormInputProps = {
    name: string;
    type: string;
    placeholder: string;
    values: any;
    errorMsg?: any;
    pattern?: any;
    required?: any;
    onChangeHandler: any;
};

const FormInput = ({
    name,
    type,
    placeholder,
    values,
    errorMsg,
    pattern,
    required,
    onChangeHandler,
}: FormInputProps): React.JSX.Element => {
    const [focused, setFocused] = useState(false);

    return (
        <>
            {type === 'radio' ? (
                <div className="w-full flex mb-3">
                    <div className="gender-title flex items-center ml-1">
                        <label className="gender-text" htmlFor="">
                            Gender :{' '}
                        </label>
                    </div>
                    <div className="gender-radio flex justify-around">
                        <input
                            type="radio"
                            id="male"
                            value="male"
                            defaultChecked
                            name="gender"
                            onClick={onChangeHandler}
                        />
                        <label htmlFor="male">Male</label>
                        <input
                            type="radio"
                            id="female"
                            value="female"
                            name="gender"
                            onClick={onChangeHandler}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={values}
                        pattern={pattern}
                        required={required}
                        onChange={onChangeHandler}
                        onBlur={() => setFocused(true)}
                        // onFocus={() => name === 'confirmPassword' && setFocused(true)}
                        className={focused ? 'focused' : ''}
                    />
                    <div className="error-msg">{errorMsg}</div>
                </div>
            )}
            <style jsx>{`
                .gender-text {
                    font-size: 15px !important;
                    color: var(--shadow-color);
                    color: rgba(141, 140, 140, 0.8);
                }
                .gender-radio {
                    flex: 8;
                }
                .gender-radio input[type='radio'] {
                    opacity: 0;
                    position: fixed;
                    width: 0;
                }
                .gender-radio label {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 80px;
                    height: 32px;
                    background-color: white;
                    border-radius: 25px;
                    cursor: pointer;
                }
                .gender-radio input[type='radio']:checked + label {
                    background-color: var(--bg-color-dark-4);
                    border: none;
                    color: white;
                }
            `}</style>
            <style jsx global>{`
                input[type='text'],
                input[type='password'] {
                    display: block;
                    box-sizing: border-box;
                    margin-bottom: 20px;
                    padding: 4px 8px;
                    width: 100%;
                    height: 32px;
                    border: none;
                    border-bottom: 1px solid var(--bg-color-dark-4);
                    border-radius: 2px;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 400;
                    font-size: 13px;
                    transition: 0.2s ease;
                }
                .error-msg {
                    font-size: 9px;
                    color: red;
                    margin-bottom: 10px;
                    margin-top: -20px;
                    display: none;
                }
                input:invalid.focused {
                    border-bottom: 1px solid red;
                }
                input:invalid.focused ~ .error-msg {
                    display: block;
                }
                [placeholder] {
                    opacity: 0.6;
                }
                [placeholder]:focus::-webkit-input-placeholder {
                    transition: text-indent 0.4s 0.4s ease;
                    text-indent: -100%;
                    opacity: 1;
                }
            `}</style>
        </>
    );
};

export default FormInput;
