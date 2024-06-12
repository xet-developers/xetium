import {sharedConfigRoutes} from '@/shared/config';

import {RegisterPage} from '@/pages/RegisterPage';
import {LandingPage} from '@/pages/LandingPage';
import {AuthorizationPage} from '@/pages/AuthorizationPage';

const {UnregisterRouteName} = sharedConfigRoutes;
const {LANDING_PAGE, REGISTER_PAGE, EMPTY, AUTH_PAGE} = UnregisterRouteName

export const UnregisteredRoutes: sharedConfigRoutes.IRouteDescription[] = [
    {
        path: EMPTY,
        component: LandingPage
    },
    {
        path: LANDING_PAGE,
        component: LandingPage
    },
    {
        path: REGISTER_PAGE,
        component: RegisterPage
    },
    {
        path: AUTH_PAGE,
        component: AuthorizationPage
    }
];
