import { type ComponentType, lazy } from 'react';

export const QueryClusteringPageAsync = lazy<ComponentType>(
    async () =>
        await import('./QueryClusteringPage'
            ).then((module) => ({ default: module.QueryClusteringPage })),
);
