import { AuthRouter } from '@modules/Auth/Screens';
import { LoginScreen } from '@modules/Auth/Screens/Login';
import { HomeRouter } from '@modules/Home/Screens';
import { DashboardScreen } from '@modules/Home/Screens/Dashboard';
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

export const RootRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path='/auth/' element={<AuthRouter />}>
                <Route path='login' element={<LoginScreen />} />
            </Route>
            <Route path='/' element={<HomeRouter />}>
                <Route path='dashboard' element={<DashboardScreen />} />
            </Route>
        </Routes>
    </BrowserRouter>
}