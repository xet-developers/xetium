import {ComponentType, lazy} from "react";

export const AuthorizationFormAsync = lazy<ComponentType>(
    async () => await import('./AuthorizationForm')
        .then((module) => ({default: module.AuthorizationForm})),
);
