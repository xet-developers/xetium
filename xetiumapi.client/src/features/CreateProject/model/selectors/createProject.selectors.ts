import {StateSchema} from "@/app/providers/StoreProvaider";

export const getProjectLabel = (state: StateSchema) => state.createProject?.projectLabel
export const getProjectUrl = (state: StateSchema) => state.createProject?.projectUrl
export const getProjectName = (state: StateSchema) => state.createProject?.projectName
