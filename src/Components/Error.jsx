import React, { useEffect, useState } from 'react';
import 'animate.css';

function Error({ error }) {
    const [showError, setShowError] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowError(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

    if (!showError) {
        return null; // Render nothing if showError is false
    }

    return (
        <div className='bg-red-500 flex animate__animated animate__backInLeft text-white p-4'>
            <p>{error}</p>
        </div>
    );
}

export default Error;
