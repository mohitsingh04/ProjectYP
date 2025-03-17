import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

const TopLoadingBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 100) {
                setProgress((prevProgress) => prevProgress + 50);
            }
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, [progress]);

    return <LoadingBar color="#6259ca" progress={progress} />;
};

export default TopLoadingBar;
