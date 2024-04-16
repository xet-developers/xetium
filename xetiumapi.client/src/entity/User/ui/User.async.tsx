import {ComponentType, lazy} from "react";

export const UserAsync = lazy<ComponentType>(
    async () => await import('./User')
    .then((module) => ({ default: module.User })),
);
