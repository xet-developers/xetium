import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {type IRegisterFormSchema} from '@/features/RegisterForm';

const initialState: IRegisterFormSchema = {
    username: '',
    name: '',
    password: '',
    secPassword: "",
    email: "",
    acceptConfPolitics: false,
    acceptPersonalData: false,
    acceptSpam: false,
};

export const registerFormSlice = createSlice({
    name: 'registerForm',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setSecondPassword: (state, action: PayloadAction<string>) => {
            state.secPassword = action.payload;
        },
        setSpamCheckbox: (state, action: PayloadAction<boolean>) => {
            state.acceptSpam = action.payload;
        },
        setAcceptPersonalDataCheckbox: (state, action: PayloadAction<boolean>) => {
            state.acceptPersonalData = action.payload;
        },
        setAcceptConfPoliticsCheckbox: (state, action: PayloadAction<boolean>) => {
            state.acceptConfPolitics = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: registerFormActions} = registerFormSlice;
export const {reducer: registerFormReducer} = registerFormSlice;
