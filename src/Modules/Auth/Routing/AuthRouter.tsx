import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthRoutes } from './AuthRouteConfig';

export const AuthRouter = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(AuthRoutes.Login);
    }, [])

    return <div>
        <h3>Auth router</h3>
        <Outlet />
    </div>
}