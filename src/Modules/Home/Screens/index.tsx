import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const HomeRouter = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/dashboard');
    }, [])

    return <div>
        <h3>Home router</h3>
        <Outlet />
    </div>;
}