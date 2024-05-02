import {type ComponentType, lazy} from "react";

export const SidebarAsync = lazy<ComponentType>(
    async () => await import('./Sidebar')
        .then((module) => ({default: module.Sidebar})),
);
