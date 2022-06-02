import { AuthRoutes } from '@modules/Auth/Routing/AuthRouteConfig';
import { CreditRoutes } from '@modules/Credit/Routing/CreditRouteConfig';

const AuthorizedRoutes = {
    Root: "/",
    CreditRoutes
}

export const RootRoutes = {
    AuthRoutes,
    AuthorizedRoutes,
    StaticRoutes: {
        Error: '/error',
        NotFound: '*'
    }
}