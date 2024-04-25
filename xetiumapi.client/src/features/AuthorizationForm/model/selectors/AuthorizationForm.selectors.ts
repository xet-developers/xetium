import {StateSchema} from "@/app/providers/StoreProvaider";


export const getUserName = (state: StateSchema) => state.authorizationForm?.username
export const getPassword = (state: StateSchema) => state.authorizationForm?.password
