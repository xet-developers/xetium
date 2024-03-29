import { type ComponentType, lazy } from 'react';

export const LandingPageAsync = lazy<ComponentType>(
    async () =>
        await import('./LandingPage'
            ).then((module) => ({ default: module.LandingPage })),
);
