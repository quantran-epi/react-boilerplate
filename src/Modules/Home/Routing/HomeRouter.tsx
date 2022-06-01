import React from 'react';
import { Outlet } from 'react-router-dom';

export const HomeRouter = () => {
    return <div>
        <Outlet />
    </div>;
}