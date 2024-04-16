import {StateSchema} from "@/app/providers/StoreProvaider";


export const getPassword = (state: StateSchema) => state.registerForm?.password
export const getName = (state: StateSchema) => state.registerForm?.username
export const getSecondPassword = (state: StateSchema) => state.registerForm?.secPassword
export const getEmail = (state: StateSchema) => state.registerForm?.email
export const getAcceptSpam = (state: StateSchema) => state.registerForm?.acceptSpam
export const getAcceptConfPolitics = (state: StateSchema) => state.registerForm?.acceptConfPolitics
export const getAcceptPersonalData = (state: StateSchema) => state.registerForm?.acceptPersonalData
