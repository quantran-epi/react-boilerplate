import { ATMRouter } from '@modules/ATM/Routing/ATMRouter';
import { UpdateATMCycleDetailCheckerScreen } from '@modules/ATM/Screens/UpdateATMCycleChecker/UpdateATMCycleDetailChecker';
import { UpdateATMCycleListCheckerScreen } from '@modules/ATM/Screens/UpdateATMCycleChecker/UpdateATMCycleListChecker';
import { UpdateATMCycleMakerScreen } from '@modules/ATM/Screens/UpdateATMCycleMaker';
import { AuthRouter } from '@modules/Auth/Routing/AuthRouter';
import { LoginScreen } from '@modules/Auth/Screens/Login';
import { CreditRouter } from '@modules/Credit/Routing/CreditRouter';
import { CreditCardDebtCollectionCheckerScreen } from '@modules/Credit/Screens/CreditCardDebtCollectionChecker';
import { CreditCardDebtCollectionMakerScreen } from '@modules/Credit/Screens/CreditCardDebtCollectionMaker';
import { ErrorScreen } from '@modules/Static/Error';
import { NotFoundScreen } from '@modules/Static/NotFound';
import { UserRouter } from '@modules/User/Routing/UserRouter';
import { UserListScreen } from '@modules/User/Screens/UserList';
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
                <Route path={RootRoutes.AuthRoutes.Login()} element={<LoginScreen />} />
            </Route>
            <Route path={RootRoutes.AuthorizedRoutes.Root} element={<AuthorizedRouter />}>
                <Route path={RootRoutes.AuthorizedRoutes.CreditRoutes.Root} element={<CreditRouter />}>
                    <Route path={RootRoutes.AuthorizedRoutes.CreditRoutes.CreditCardDebtCollectionMaker} element={<CreditCardDebtCollectionMakerScreen />} />
                    <Route path={RootRoutes.AuthorizedRoutes.CreditRoutes.CreditCardDebtCollectionChecker} element={<CreditCardDebtCollectionCheckerScreen />} />
                </Route>
                <Route path={RootRoutes.AuthorizedRoutes.ATMRoutes.Root} element={<ATMRouter />}>
                    <Route path={RootRoutes.AuthorizedRoutes.ATMRoutes.UpdateATMCycleMaker()} element={< UpdateATMCycleMakerScreen />} />
                    <Route path={RootRoutes.AuthorizedRoutes.ATMRoutes.UpdateATMCycleListChecker()} element={<UpdateATMCycleListCheckerScreen />}>
                        <Route path=':id' element={<UpdateATMCycleDetailCheckerScreen />} />
                    </Route>
                </Route>
                <Route path={RootRoutes.AuthorizedRoutes.UserRoutes.Root} element={<UserRouter />}>
                    <Route index element={<UserListScreen />} />
                </Route>
            </Route>
            <Route path={RootRoutes.StaticRoutes.NotFound} element={<NotFoundScreen />} />
        </Routes>
    </BrowserRouter>
}