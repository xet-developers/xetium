import {type ComponentType, lazy} from "react";

export const CreateRequestAsync = lazy<ComponentType>(
    async () => await import('./CreateRequest')
        .then((module) => ({default: module.CreateRequest})),
);
