
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='text-center mt-5'>
            <h1 className='fs-1 fw-bolder'>404</h1>
            <h4>Page Not Found</h4>
            <p>The Page you are looking for doesn't exist.</p>
            <button onClick={() => navigate('/home')} className='btn btn-primary'>Go to Home</button>
        </div>
    );
};

export default NotFound;