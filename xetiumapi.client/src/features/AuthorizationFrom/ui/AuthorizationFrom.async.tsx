import {ComponentType, lazy} from "react";

export const AuthorizationFromAsync = lazy<ComponentType>(
    async () => await import('./AuthorizationFrom')
    .then((module) => ({ default: module.AuthorizationFrom })),
);
