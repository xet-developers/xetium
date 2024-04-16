import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {ISidebarSliceSchema} from '../types/ISidebarSliceSchema'


const initialState: ISidebarSliceSchema = {
    test: ''
};

export const SidebarSlice = createSlice({
    name: 'Sidebar',
    initialState,
    reducers: {
        testReducer: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: SidebarSliceActions} = SidebarSlice;
export const {reducer: SidebarSliceReducer} = SidebarSlice;
