import React from 'react';

const TermsAndConditionsPopup = (): JSX.Element => {
    return (
        <>
            <div className="h-full py-2 px-4">
                <div className="popup-heading text-2xl font-bold ">Terms and Conditions</div>
                <div className="h-5/6 flex justify-center items-center">
                    No Terms and Conditions.... Enjoy&#129322;
                </div>
            </div>

            <style jsx>{`
                .popup-heading {
                    color: var(--button-color);
                }
            `}</style>
        </>
    );
};

export default TermsAndConditionsPopup;
