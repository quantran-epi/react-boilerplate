import { useAppContext } from '@app-context';
import { Button } from '@components/Button';
import { Container } from '@components/Layout/Container';
import { Content } from '@components/Layout/Content';
import { Header } from '@components/Layout/Header';
import { Stack } from '@components/Layout/Stack';
import { SidebarWidget } from '@widgets/Sidebar';
import { Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootRoutes } from './RootRoutes';
import { UserOutlined } from "@ant-design/icons";
import { Menu } from '@components/Menu';
import { Dropdown } from '@components/Dropdown';

export const AuthorizedRouter = () => {
    const { services } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!services.Auth.isAuthenticated()) navigate(RootRoutes.AuthRoutes.Login, {
            state: {
                returnUrl: location.pathname
            }
        });
    }, [])

    const _onLogoutClick = () => {
        services.Auth.logout();
        navigate(RootRoutes.AuthRoutes.Login);
    }

    return <React.Fragment>
        {services.Auth.isAuthenticated() && <Container>
            <Header className="header" style={{ paddingInline: 25 }}>
                <Stack justify="space-between">
                    <Space align="center" size={"small"}>
                        <Typography.Title style={{ marginBottom: 0, color: "white" }} level={3}>Hệ thống ứng dụng thẻ</Typography.Title>
                    </Space>

                    <Dropdown overlay={<Menu
                        items={[
                            {
                                label: "Log out",
                                key: '0',
                                onClick: _onLogoutClick
                            }
                        ]}
                    />} trigger={['click']}>
                        <Button shape="circle" icon={<UserOutlined />} size="large" />
                    </Dropdown>

                </Stack>
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
        </Container>}
    </React.Fragment>
}