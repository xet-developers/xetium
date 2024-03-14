import {sharedConfigRoutes} from '@/shared/config'

import {AdvertisingPage} from '@/pages/AdvertisingPage'
import {AuthorizationPage} from '@/pages/AuthorizationPage'
import {RegisterPage} from '@/pages/RegisterPage'



const {UnregisterRouteName} = sharedConfigRoutes;
const {REGISTER_PAGE, ADVERTISING_PAGE, AUTH_PAGE} = UnregisterRouteName


export const UnregisteredRoutes: sharedConfigRoutes.IRouteDescription[] = [
    {
        path: REGISTER_PAGE,
        component: RegisterPage
    },
    {
        path: ADVERTISING_PAGE,
        component: AdvertisingPage
    },
    {
        path: AUTH_PAGE,
        component: AuthorizationPage
    }
];
