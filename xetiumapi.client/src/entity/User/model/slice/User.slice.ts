import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IUserSliceSchema, User} from '../types/IUserSliceSchema'
import {initAuthData} from "../../model/servises/initAuthData.ts";


const initialState: IUserSliceSchema = {
    initialized: false,
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(initAuthData.fulfilled, (state, {payload}: PayloadAction<User>) => {
            state.authData = payload;
            state.initialized = true;
        });
        builder.addCase(initAuthData.rejected, (state) => {
            state.initialized = true;
        })
    },
});

// Action creators are generated for each case reducer function
export const {actions: UserSliceActions} = UserSlice;
export const {reducer: UserSliceReducer} = UserSlice;
