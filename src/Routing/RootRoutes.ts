import AuthRoutes from '@modules/Auth/Routing/AuthRouteConfig';
import CreditRoutes from '@modules/Credit/Routing/CreditRouteConfig';
import UserRoutes from '@modules/User/Routing/UserRouteConfig';
import ATMRoutes from '@modules/ATM/Routing/ATMRouteConfig';

const AuthorizedRoutes = {
    Root: "/",
    CreditRoutes,
    UserRoutes,
    ATMRoutes
}

export const RootRoutes = {
    AuthRoutes,
    AuthorizedRoutes,
    StaticRoutes: {
        Error: '/error',
        NotFound: '*'
    }
}