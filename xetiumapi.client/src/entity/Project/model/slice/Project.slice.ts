import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IProjectSliceSchema} from '../types/IProjectSliceSchema'


const initialState: IProjectSliceSchema = {
    test: ''
};

export const ProjectSlice = createSlice({
    name: 'Project',
    initialState,
    reducers: {
        testReducer: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: ProjectSliceActions} = ProjectSlice;
export const {reducer: ProjectSliceReducer} = ProjectSlice;
