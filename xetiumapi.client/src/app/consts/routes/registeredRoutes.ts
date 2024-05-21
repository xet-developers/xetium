import {sharedConfigRoutes} from '@/shared/config';

import { QueryClusteringPage } from '@/pages/QueryClusteringPage';
import { CheckSitePositionsPage } from '@/pages/CheckSitePositionsPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { PersonalAccountPage } from '@/pages/PersonalAccountPage';
import { MyProjectPage } from '@/pages/MyProjectPage';
import { AutoQueryGenerationPage } from '@/pages/AutoQueryGenerationPage';
import { AnalysisToSchedulePage } from '@/pages/AnalysisToSchedulePage';

const {RegisterRouteName} = sharedConfigRoutes;
const {
    QUERY_CLUSTERING_PAGE,
    CHECK_SITE_POSITIONS_PAGE,
    REPORTS_PAGE,
    PERSONAL_ACCOUNT_PAGE,
    MY_PROJECT_PAGE,
    AUTO_QUERY_GENERATION_PAGE,
    ANALYSIS_TO_SCHEDULE_PAGE,
    EMPTY} = RegisterRouteName


export const RegisteredRoutes: sharedConfigRoutes.IRouteDescription[] = [
    {
        path: QUERY_CLUSTERING_PAGE,
        component: QueryClusteringPage
    },
    {
        path: CHECK_SITE_POSITIONS_PAGE,
        component: CheckSitePositionsPage
    },
    {
        path: REPORTS_PAGE,
        component: ReportsPage
    },
    {
        path: PERSONAL_ACCOUNT_PAGE,
        component: PersonalAccountPage
    },
    {
        path: MY_PROJECT_PAGE,
        component: MyProjectPage
    },
    {
        path: AUTO_QUERY_GENERATION_PAGE,
        component: AutoQueryGenerationPage
    },
    {
        path: ANALYSIS_TO_SCHEDULE_PAGE,
        component: AnalysisToSchedulePage
    },
    {
        path: EMPTY,
        component: MyProjectPage
    }
];
