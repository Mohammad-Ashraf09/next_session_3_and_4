import React from 'react';

type ButtonProps = {
    label: string;
    isDisabled?: boolean;
    height?: string;
    width?: string;
    fontSize?: string;
    borderRadius?: string;
};

const Button = ({
    label,
    isDisabled = false,
    height = '36px',
    width = '120px',
    fontSize = '14px',
    borderRadius = '25px',
}: ButtonProps): React.JSX.Element => {
    return (
        <>
            <button className="btn" disabled={isDisabled}>
                {label}
            </button>
            <style>{`
                .btn {
                    height: ${height};
                    width: ${width};
                    font-size: ${fontSize};
                    border-radius: ${borderRadius};
                    color: #fff;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--button-color);
                    box-shadow: 4px 4px 10px var(--button-shadow);
                    opacity: 0.8;
                }
                .btn:hover {
                    opacity: 1;
                    transition: 0.2s ease;
                }
                .btn:disabled {
                    background-color: var(--grey-light);
                    box-shadow: none;
                    cursor: not-allowed;
                    opacity: 1;
                }
            `}</style>
        </>
    );
};

export default Button;
