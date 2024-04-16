import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IUserSliceSchema} from '../types/IUserSliceSchema'


const initialState: IUserSliceSchema = {
    test: ''
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        testReducer: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: UserSliceActions} = UserSlice;
export const {reducer: UserSliceReducer} = UserSlice;
