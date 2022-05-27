import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { HomeRoutes } from './HomeRouteConfig';

export const HomeRouter = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(HomeRoutes.Dashboard);
    }, [])

    return <div>
        <h3>Home router</h3>
        <Outlet />
    </div>;
}