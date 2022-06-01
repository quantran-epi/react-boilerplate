import { AuthRouter } from '@modules/Auth/Routing/AuthRouter';
import { LoginScreen } from '@modules/Auth/Screens/Login';
import { DashboardRouter } from '@modules/Dashboard/Routing/DashboardRouter';
import { DashboardScreen } from '@modules/Dashboard/Screens/Dashboard';
import { CreditRouter } from '@modules/Function/Credit/Routing/CreditRouter';
import { CreditCardDebtCollectionCheckerScreen } from '@modules/Function/Credit/Screens/CreditCardDebtCollectionChecker';
import { CreditCardDebtCollectionMakerScreen } from '@modules/Function/Credit/Screens/CreditCardDebtCollectionMaker';
import { ErrorScreen } from '@modules/Static/Error';
import { NotFoundScreen } from '@modules/Static/NotFound';
import React from 'react';
import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import { AuthorizedRouter } from './AuthorizedRouter';
import { RootRoutes } from './RootRoutes';

export const RootRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path={RootRoutes.AuthRoutes.Root} element={<AuthRouter />}>
                <Route index element={<LoginScreen />} />
                <Route path={RootRoutes.AuthRoutes.Login} element={<LoginScreen />} />
            </Route>
            <Route path={RootRoutes.AuthorizedRoutes.Root} element={<AuthorizedRouter />}>
                <Route path={RootRoutes.AuthorizedRoutes.CreditRoutes.Root} element={<CreditRouter />}>
                    <Route path={RootRoutes.AuthorizedRoutes.CreditRoutes.CreditCardDebtCollectionMaker} element={<CreditCardDebtCollectionMakerScreen />} />
                    <Route path={RootRoutes.AuthorizedRoutes.CreditRoutes.CreditCardDebtCollectionChecker} element={<CreditCardDebtCollectionCheckerScreen />} />
                </Route>
            </Route>
            <Route path={RootRoutes.StaticRoutes.Error} element={<ErrorScreen />} />
            <Route path={RootRoutes.StaticRoutes.NotFound} element={<NotFoundScreen />} />
        </Routes>
    </BrowserRouter>
}