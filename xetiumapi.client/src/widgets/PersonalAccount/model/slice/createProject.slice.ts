import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

const initialState: ICreateProjectSliceSchema = {
    projectName: "",
    projectUrl: ""
};

export const createProjectSlice = createSlice({
    name: 'createProject',
    initialState,
    reducers: {
        setProjectName: (state, action: PayloadAction<string>) => {
            state.projectName = action.payload;
        },
        setProjectUrl: (state, action: PayloadAction<string>) => {
            state.projectUrl = action.payload;
        },
        setProjectLabel: (state, action: PayloadAction<string>) => {
            state.projectLabel = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: createProjectActions} = createProjectSlice;
export const {reducer: createProjectReducer} = createProjectSlice;

