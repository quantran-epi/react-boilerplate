import { AuthRouter } from '@modules/Auth/Routing/AuthRouter';
import { LoginScreen } from '@modules/Auth/Screens/Login';
import { HomeRouter } from '@modules/Home/Routing/HomeRouter';
import { DashboardScreen } from '@modules/Home/Screens/Dashboard';
import { ErrorScreen } from '@modules/Static/Error';
import { NotFoundScreen } from '@modules/Static/NotFound';
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { RootRoutes } from './RootRoutes';

export const RootRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path={RootRoutes.AuthRoutes.Root} element={<AuthRouter />}>
                <Route path={RootRoutes.AuthRoutes.Login} element={<LoginScreen />} />
            </Route>
            <Route path={RootRoutes.HomeRoutes.Root} element={<HomeRouter />}>
                <Route path={RootRoutes.HomeRoutes.Dashboard} element={<DashboardScreen />} />
            </Route>
            <Route path={RootRoutes.StaticRoutes.Error} element={<ErrorScreen />} />
            <Route path={RootRoutes.StaticRoutes.NotFound} element={<NotFoundScreen />} />
        </Routes>
    </BrowserRouter>
}