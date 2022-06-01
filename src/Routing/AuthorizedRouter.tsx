import { useAppContext } from '@app-context';
import { Container } from '@components/Layout/Container';
import { Content } from '@components/Layout/Content';
import { Header } from '@components/Layout/Header';
import { SidebarWidget } from '@widgets/Sidebar';
import { Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootRoutes } from './RootRoutes';

export const AuthorizedRouter = () => {
    const { services } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        _checkLogin().then(isAuthenticated => {
            if (!isAuthenticated) navigate(RootRoutes.AuthRoutes.Login);
        })
    }, [])

    const _checkLogin = async () => {
        return services.Auth.isAuthenticated();
    }

    return <Container>
        <Header className="header" style={{ paddingInline: 25 }}>
            <Space align="center" size={"small"}>
                <Typography.Title style={{ marginBottom: 0, color: "white" }} level={3}>Hệ thống ứng dụng thẻ</Typography.Title>
            </Space>
        </Header>
        <Container>
            <SidebarWidget />
            <Container style={{ padding: '0 24px 24px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}>
                    <Outlet />
                </Content>
            </Container>
        </Container>
    </Container>
}