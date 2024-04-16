import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IAuthorizationFromSliceSchema} from '../types/IAuthorizationFromSliceSchema'


const initialState: IAuthorizationFromSliceSchema = {
    test: ''
};

export const AuthorizationFromSlice = createSlice({
    name: 'AuthorizationFrom',
    initialState,
    reducers: {
        testReducer: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: AuthorizationFromSliceActions} = AuthorizationFromSlice;
export const {reducer: AuthorizationFromSliceReducer} = AuthorizationFromSlice;
