import {sharedConfigRoutes} from '@/shared/config'

import {RegisterPage} from '@/pages/RegisterPage'
import {LandingPage} from '@/pages/LandingPage'
import {AuthorizationPage} from '@/pages/AuthorizationPage'

const {UnregisterRouteName} = sharedConfigRoutes;
const {REGISTER_PAGE, LANDING_PAGE, EMPTY, AUTH_PAGE} = UnregisterRouteName


export const UnregisteredRoutes: sharedConfigRoutes.IRouteDescription[] = [
    {
        path: REGISTER_PAGE,
        component: RegisterPage
    },
    {
        path: LANDING_PAGE,
        component: LandingPage
    },
    {
        path: AUTH_PAGE,
        component: AuthorizationPage
    },
    {
        path: EMPTY,
        component: AuthorizationPage
    }
];
