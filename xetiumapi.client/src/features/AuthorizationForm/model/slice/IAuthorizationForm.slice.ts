import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IAuthorizationFormSliceSchema} from '../types/IAuthorizationFormSliceSchema'


const initialState: IAuthorizationFormSliceSchema = {
    password: "",
    username: ""
};

export const AuthorizationFormSlice = createSlice({
    name: 'AuthorizationForm',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: AuthorizationFormSliceActions} = AuthorizationFormSlice;
export const {reducer: AuthorizationFormSliceReducer} = AuthorizationFormSlice;
