import { HomeRoutes } from '@modules/Home/Routing/HomeRouteConfig';
import { AuthRoutes } from '@modules/Auth/Routing/AuthRouteConfig';

export const RootRoutes = {
    AuthRoutes,
    HomeRoutes,
    StaticRoutes: {
        Error: '/error',
        NotFound: '*'
    }
}