import React from 'react';
import TermsAndConditionsPopup from './TermsAndConditionsPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type PopupLayoutProps = {
    blurrScreenHandler: () => void;
    popup?: string;
    height?: string;
    width?: string;
};

const PopupLayout = ({
    blurrScreenHandler,
    popup,
    height,
    width,
}: PopupLayoutProps): JSX.Element => {
    const popupMappings = {
        TermsAndConditionsPopup: TermsAndConditionsPopup,
    };
    const RenderPopup = popupMappings[popup];

    return (
        <>
            <div
                className="relative bg-white rounded-lg"
                style={{ maxHeight: height, height: 'calc(100vh - 100px)', width: width }} // need to refactor
            >
                <div className="popup-cross h-8 w-8 flex justify-center items-center absolute top-2 right-2 rounded-full cursor-pointer">
                    <FontAwesomeIcon
                        icon={faXmark}
                        // size="2x"
                        // style={{ color: 'orange' }}
                        onClick={blurrScreenHandler}
                    />
                </div>
                <RenderPopup />
            </div>

            <style jsx>{`
                .popup-cross {
                    background-color: var(--bg-color);
                }
            `}</style>
        </>
    );
};

export default PopupLayout;
