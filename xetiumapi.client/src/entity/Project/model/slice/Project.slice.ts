import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IProjectSliceSchema} from '../types/IProjectSliceSchema'
import {USER_CURRENT_PROJECT_ID} from "@/shared/const/localstorage.ts";


const initialState: IProjectSliceSchema = {
    currentProjectId: ' ' || localStorage.getItem(USER_CURRENT_PROJECT_ID)
};

export const ProjectSlice = createSlice({
    name: 'Project',
    initialState,
    reducers: {
        setCurrentProjectId: (state, action: PayloadAction<string>) => {
            localStorage.setItem(USER_CURRENT_PROJECT_ID, action.payload)
            state.currentProjectId = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: ProjectSliceActions} = ProjectSlice;
export const {reducer: ProjectSliceReducer} = ProjectSlice;
