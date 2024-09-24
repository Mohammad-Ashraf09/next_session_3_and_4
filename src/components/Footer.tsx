import React from 'react';

const Footer = (): JSX.Element => {
    return (
        <>
            <div className="footer-container h-8 flex justify-center items-center">
                <p className="text-xs">copy right, All rights served, 2024</p>
            </div>

            <style>{`
                .footer-container {
                    height: 40px;
                    width: 100%;
                    color: var(--button-color);
                }
            `}</style>
        </>
    );
};

export default Footer;
