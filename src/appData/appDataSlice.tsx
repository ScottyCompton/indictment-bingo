import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDataState} from '../interfaces';
import {AppUser} from '../interfaces'


const initialState: AppDataState = {
    uiState: {    
        isLoading: true
    }
}


const cardGenDataSlice = createSlice({
    name: 'appData',
    initialState: initialState,
    reducers: {

        setAppLoading(state, action: PayloadAction<boolean>) {
            state.uiState.isLoading = action.payload;
        },


        loadData(state) {
            state.uiState.isLoading = true;
        },

        loginUser(state, action: PayloadAction<AppUser>) {
            state.uiState.user = action.payload;
        },
        
        refreshUserSession(state, action:PayloadAction<AppUser>) {
            if(action.payload.user) {
                state.uiState.user = action.payload
            }
            
        }

    }
})

const {actions, reducer} = cardGenDataSlice;

export const {setAppLoading, loadData, loginUser, refreshUserSession} = actions;
export default reducer;

