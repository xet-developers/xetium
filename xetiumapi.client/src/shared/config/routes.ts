import {ComponentType, PropsWithChildren} from 'react';

export enum UnregisterRouteName {
    AUTH_PAGE = '/authorization',
    REGISTER_PAGE = '/registration',
    ADVERTISING_PAGE = '/advertising',
}

export enum RegisterRouteName {

}

export interface IRouteDescription {
    path: UnregisterRouteName;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
}

