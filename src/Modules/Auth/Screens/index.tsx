import React, { useEffect } from 'react';
import { Outlet, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { LoginScreen } from './Login';

export const AuthRouter = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/auth/login');
    }, [])

    return <div>
        <h3>Auth router</h3>
        <Outlet />
    </div>;
}