import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useAppContext } from '@app-context';
import { AppShadow } from '@common/Constants/Shadow';
import { Button } from '@components/Button';
import { Dropdown } from '@components/Dropdown';
import { Container } from '@components/Layout/Container';
import { Content } from '@components/Layout/Content';
import { Header } from '@components/Layout/Header';
import { Space } from '@components/Layout/Space';
import { Stack } from '@components/Layout/Stack';
import { Menu } from '@components/Menu';
import { Typography } from '@components/Typography';
import { useStore } from '@store';
import { SidebarWidget } from '@widgets/Sidebar';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootRoutes } from './RootRoutes';

export const AuthorizedRouter = () => {
    const { t } = useTranslation("Common");
    const { services } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    const currentFunction = useStore((state: any) => state.currentFunction);

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
            <Container>
                <SidebarWidget />
                <Container style={{ padding: 24 }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            minHeight: 280,
                        }}>
                        <Header className="header" style={{
                            paddingInline: 25,
                            marginBottom: 25,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            boxShadow: AppShadow.card
                        }}>
                            <Stack justify="space-between">
                                <Typography.Title style={{ margin: 0 }} level={4}>{currentFunction}</Typography.Title>
                                <Dropdown
                                    placement="bottomRight"
                                    overlay={<Menu
                                        items={[
                                            {
                                                label: t("TopNavigation.User.Logout"),
                                                key: '0',
                                                onClick: _onLogoutClick,
                                                icon: <LogoutOutlined />
                                            }
                                        ]}
                                    />} trigger={['click']}>
                                    <Button type="link" block style={{ height: "100%", padding: 0 }}>
                                        <Space>
                                            <Typography.Text>{services.Auth.getAuthenticatedUser()?.username}</Typography.Text>
                                            <Button shape="circle" icon={<UserOutlined />} size="large" />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </Stack>
                        </Header>
                        <Outlet />
                    </Content>
                </Container>
            </Container>
        </Container>}
    </React.Fragment>
}