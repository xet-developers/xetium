import { type ComponentType, lazy } from 'react';

import { type IRegisterFormProps } from './RegisterForm';

export const RegisterFormAsync = lazy<ComponentType<IRegisterFormProps>>(
    async () =>
        await import('./RegisterForm'
            ).then((module) => ({ default: module.RegisterForm })),
);
