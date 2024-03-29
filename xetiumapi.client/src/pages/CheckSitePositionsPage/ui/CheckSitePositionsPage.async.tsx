import { type ComponentType, lazy } from 'react';

export const CheckSitePositionsPageAsync = lazy<ComponentType>(
    async () =>
        await import('./CheckSitePositionsPage'
            ).then((module) => ({ default: module.CheckSitePositionsPage })),
);
