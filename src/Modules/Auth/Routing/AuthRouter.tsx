import { Container } from '@components/Layout/Container';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthRouter = () => {
    return <Container>
        <Outlet />
    </Container>
}