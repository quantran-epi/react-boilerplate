import { AuthRoutes } from '@modules/Auth/Routing/AuthRouteConfig';
import { CreditRoutes } from '@modules/Credit/Routing/CreditRouteConfig';
import { UserRoutes } from '@modules/User/Routing/UserRouteConfig';

const AuthorizedRoutes = {
    Root: "/",
    CreditRoutes,
    UserRoutes
}

export const RootRoutes = {
    AuthRoutes,
    AuthorizedRoutes,
    StaticRoutes: {
        Error: '/error',
        NotFound: '*'
    }
}