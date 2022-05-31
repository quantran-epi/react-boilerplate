import { Container } from '@components/Layout/Container';
import { Content } from '@components/Layout/Content';
import { Header } from '@components/Layout/Header';
import { AuthRouter } from '@modules/Auth/Routing/AuthRouter';
import { LoginScreen } from '@modules/Auth/Screens/Login';
import { CreditRouter } from '@modules/Function/Credit/Routing/CreditRouter';
import { CreditCardDebtCollectionCheckerScreen } from '@modules/Function/Credit/Screens/CreditCardDebtCollectionChecker';
import { CreditCardDebtCollectionMakerScreen } from '@modules/Function/Credit/Screens/CreditCardDebtCollectionMaker';
import { HomeRouter } from '@modules/Home/Routing/HomeRouter';
import { DashboardScreen } from '@modules/Home/Screens/Dashboard';
import { ErrorScreen } from '@modules/Static/Error';
import { NotFoundScreen } from '@modules/Static/NotFound';
import { SidebarWidget } from '@widgets/Sidebar';
import { Space, Typography } from 'antd';
import React from 'react';
import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import { RootRoutes } from './RootRoutes';
import { CreditCardFilled } from '@ant-design/icons';

export const RootRouter = () => {

    return <BrowserRouter>
        <Container>
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
                        <Routes>
                            <Route path={RootRoutes.AuthRoutes.Root} element={<AuthRouter />}>
                                <Route path={RootRoutes.AuthRoutes.Login} element={<LoginScreen />} />
                            </Route>
                            <Route path={RootRoutes.HomeRoutes.Root} element={<HomeRouter />}>
                                <Route path={RootRoutes.HomeRoutes.Dashboard} element={<DashboardScreen />} />
                            </Route>
                            <Route path={RootRoutes.CreditRoutes.Root} element={<CreditRouter />}>
                                <Route path={RootRoutes.CreditRoutes.CreditCardDebtCollectionMaker} element={<CreditCardDebtCollectionMakerScreen />} />
                                <Route path={RootRoutes.CreditRoutes.CreditCardDebtCollectionChecker} element={<CreditCardDebtCollectionCheckerScreen />} />
                            </Route>
                            <Route path={RootRoutes.StaticRoutes.Error} element={<ErrorScreen />} />
                            <Route path={RootRoutes.StaticRoutes.NotFound} element={<NotFoundScreen />} />
                        </Routes>
                    </Content>
                </Container>
            </Container>
        </Container>
    </BrowserRouter>
}