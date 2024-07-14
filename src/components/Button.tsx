import React from 'react';

const Button = ({
    type,
    label,
    isDisabled = false,
    h = '36px',
    w = '120px',
    fs = '14px',
    round = '25px',
}) => {
    return (
        <>
            <button type={type} className="btn" disabled={isDisabled}>
                {label}
            </button>
            <style>{`
                .btn {
                    height: ${h};
                    width: ${w};
                    font-size: ${fs};
                    border-radius: ${round};
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
