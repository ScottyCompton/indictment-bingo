import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDataState, Subject, SelectedSubject} from '../interfaces';



const initialState: AppDataState = {
    subjects: [],
    selectedSubjects: [],
    uiState: {
        screen: 'STEP_1',
        isLoading: true,
        tileDisplayCount: 0,
        rollComplete: false
    }
}

const appDataSlice = createSlice({
    name: 'appData',
    initialState: initialState,
    reducers: {

        reeinitialize(state) {
            state.uiState.rollComplete = false;
            state.selectedSubjects = [];
            state.uiState.tileDisplayCount = 0;
            state.uiState.screen = 'STEP_1';
        },

        setAppLoading(state, action: PayloadAction<boolean>) {
            state.uiState.isLoading = action.payload;
        },

        updateSelectedSubjects(state, action:PayloadAction<SelectedSubject[]>) {
            state.selectedSubjects = action.payload;
        },

        loadAppData(state, action: PayloadAction<Subject[]>) {
            state.subjects = action.payload;
        },

        switchScreen(state, action: PayloadAction<string>) {
            state.uiState.screen = action.payload;
        },

        updateTileDisplayCount(state) {
            state.uiState.tileDisplayCount++;
            if(state.uiState.tileDisplayCount === state.selectedSubjects.length) {
                state.uiState.rollComplete = true;
            }
        }
    }
})

const {actions, reducer} = appDataSlice;

export const {reeinitialize, loadAppData,updateTileDisplayCount, setAppLoading, updateSelectedSubjects, switchScreen} = actions;
export default reducer;

