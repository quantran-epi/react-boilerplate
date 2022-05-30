import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthRouter = () => {
    return <div>
        <h3>Auth router</h3>
        <Outlet />
    </div>
}