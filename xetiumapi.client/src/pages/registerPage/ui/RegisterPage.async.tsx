import { type ComponentType, lazy } from 'react';

export const RegisterPageAsync = lazy<ComponentType>(
    async () =>
        await import('./RegisterPage'
            ).then((module) => ({ default: module.RegisterPage })),
);
