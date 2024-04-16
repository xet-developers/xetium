import { type ComponentType, lazy } from 'react';

export const AnalysisToSchedulePageAsync = lazy<ComponentType>(
    async () =>
        await import('./AnalysisToSchedulePage'
            ).then((module) => ({ default: module.AnalysisToSchedulePage })),
);
