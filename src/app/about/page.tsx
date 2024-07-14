import React from 'react';

type AboutProps = {
    data?: any;
};

const AboutPage = ({ data }: AboutProps): JSX.Element => {
    return (
        <div className="about flex justify-center items-center">
            <h1>About Page</h1>
        </div>
    );
};

export default AboutPage;
