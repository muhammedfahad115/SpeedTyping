import React, { useEffect, useState } from 'react';
import 'animate.css';
import './Error.css'; 

function Error({ error }) {
    const [showError, setShowError] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => setShowError(false), 300); // Wait for the fade-out transition to complete
        }, 3000);

        return () => clearTimeout(timer);
    }, [error]);

    if (!showError) {
        return null;
    }

    return (
        <div className={`flex item w-full absolute bottom-2 error-container ${visible ? 'visible' : ''}`}>
            <div className='bg-red-500 text-white w-[210px] font-bold text-sm p-4'>
                <p>{error}</p>
            </div>
        </div>
    );
}

export default Error;
