import { Container } from '@components/Layout/Container';
import { Content } from '@components/Layout/Content';
import { useStore } from '@store';
import { HeaderWidget } from "@widgets/Header";
import { SidebarWidget } from '@widgets/Sidebar';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootRoutes } from './RootRoutes';

export const AuthorizedRouter = () => {
    const services = useStore(state => state.services);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!services.Auth.isAuthenticated()) navigate(RootRoutes.AuthRoutes.Login, {
            state: {
                returnUrl: location.pathname
            }
        });
    }, [])


    return <React.Fragment>
        {services.Auth.isAuthenticated() && <Container>
            <Container>
                <SidebarWidget />
                <Container style={{ padding: 24 }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            minHeight: "100%",
                        }}>
                        <HeaderWidget />
                        <Outlet />
                    </Content>
                </Container>
            </Container>
        </Container>}
    </React.Fragment>
}