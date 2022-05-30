import { HomeRoutes } from '@modules/Home/Routing/HomeRouteConfig';
import { AuthRoutes } from '@modules/Auth/Routing/AuthRouteConfig';
import { CreditRoutes } from '@modules/Function/Credit/Routing/CreditRouteConfig';

export const RootRoutes = {
    AuthRoutes,
    HomeRoutes,
    CreditRoutes,
    StaticRoutes: {
        Error: '/error',
        NotFound: '*'
    }
}