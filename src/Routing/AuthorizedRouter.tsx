import { Container } from '@components/Layout/Container';
import { Content } from '@components/Layout/Content';
import { QueryFactory } from '@queries';
import { useStore } from '@store';
import { HeaderWidget } from "@widgets/Header";
import { SidebarWidget } from '@widgets/Sidebar';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootRoutes } from './RootRoutes';

export const AuthorizedRouter = () => {
    const services = useStore(state => state.services);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!_isAccessible())
            navigate(RootRoutes.AuthRoutes.Login, {
                state: {
                    returnUrl: location.pathname
                }
            });
        else {
            queryClient.refetchQueries(QueryFactory.Sidebar.Menu());
        }
    }, [])

    const _isAccessible = (): boolean => {
        return services.Auth.SignIn.isAuthenticated() && services.Permission.Role.isAuthorized(location.pathname);
    }

    return <React.Fragment>
        {_isAccessible() && <Container>
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