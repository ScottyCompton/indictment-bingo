import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDataState} from '../interfaces';
import {AppDataLogin, UserCard} from '../interfaces'


const initialState: AppDataState = {
    uiState: {    
        isLoading: false
    }
}


const cardGenDataSlice = createSlice({
    name: 'appData',
    initialState: initialState,
    reducers: {

        setAppLoading(state, action: PayloadAction<boolean>)  {
            state.uiState.isLoading = action.payload;
        },


        loadUserCardData(state, action: PayloadAction<UserCard[]>) {
            state.uiState.userCards = action.payload;
        },

        loginUser(state, action: PayloadAction<AppDataLogin>) {
            state.uiState.user = action.payload.user;
            state.uiState.token = action.payload.token;
        },
        
        refreshUserSession(state, action:PayloadAction<AppDataLogin>) {
            if(action.payload) {
                state.uiState.user = action.payload.user;
                state.uiState.token = action.payload.token;
            }            
        }

    }
})

const {actions, reducer} = cardGenDataSlice;

export const {setAppLoading, loadUserCardData, loginUser, refreshUserSession} = actions;
export default reducer;

