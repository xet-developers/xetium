import { type ComponentType, lazy } from 'react';

export const ReportsPageAsync = lazy<ComponentType>(
    async () =>
        await import('./ReportsPage'
            ).then((module) => ({ default: module.ReportsPage })),
);
