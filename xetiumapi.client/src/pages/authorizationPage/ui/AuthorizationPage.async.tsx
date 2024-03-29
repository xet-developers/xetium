import { type ComponentType, lazy } from 'react';

export const AuthorizationPageAsync = lazy<ComponentType>(
    async () =>
        await import('./AuthorizationPage'
            ).then((module) => ({ default: module.AuthorizationPage })),
);
