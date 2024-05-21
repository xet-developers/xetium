import {ComponentType, PropsWithChildren} from 'react';

export enum UnregisterRouteName {
    EMPTY='*',
    AUTH_PAGE = '/authorization',
    LANDING_PAGE = '/landing',
    REGISTER_PAGE = '/registration',
}

export enum RegisterRouteName {
    EMPTY='*',
    QUERY_CLUSTERING_PAGE = '/queryclustering',
    CHECK_SITE_POSITIONS_PAGE = '/checksitepositions',
    REPORTS_PAGE = '/reports',
    PERSONAL_ACCOUNT_PAGE = '/personalaccount',
    MY_PROJECT_PAGE = '/myproject',
    AUTO_QUERY_GENERATION_PAGE= '/autoquerygeneration',
    ANALYSIS_TO_SCHEDULE_PAGE = '/analysistoschedule',
}

export interface IRouteDescription {
    path: UnregisterRouteName | RegisterRouteName;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
}

