import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDataLogin, AppDataState, UserCard, AppLoadingPayload, AppError} from '../interfaces'


const initialState: AppDataState = {
    uiState: {    
        isLoading: false
    }
}


const cardGenDataSlice = createSlice({
    name: 'appData',
    initialState: initialState,
    reducers: {

        setAppLoading(state, action: PayloadAction<AppLoadingPayload>)  {
            state.uiState.isLoading = action.payload.isLoading;
            if(action.payload.loadingMsg && action.payload.isLoading) {
                state.uiState.loadingMsg = action.payload.loadingMsg
            } else {
                state.uiState.loadingMsg = 'Doin\' stuff... just relax.'
            }
        },

        loadUserCardData(state, action: PayloadAction<UserCard[]>) {
            state.uiState.userCards = action.payload;
        },

        loginUser(state, action: PayloadAction<any>) {
            state.uiState.user = action.payload.user;
            state.uiState.token = action.payload.token;
        },

        logoutUser(state) {
            state.uiState.user = undefined;
            window.localStorage.clear();
        },

        setLoginFail(state, action: PayloadAction<boolean>) {
            
            state.uiState.loginFail = action.payload === true ? state.uiState.loginFail : undefined;
        },
        
        refreshUserSession(state, action:PayloadAction<AppDataLogin>) {
            if(action.payload) {
                state.uiState.user = action.payload.user;
                state.uiState.token = action.payload.token;
            }            
        },

        clearError(state) {
            state.uiState.appError = undefined;
        },

        reportError(state, action: PayloadAction<AppError>) {
            state.uiState.isLoading = false;
            state.uiState.appError = action.payload;
        }
    }
})

const {actions, reducer} = cardGenDataSlice;

export const {
    setAppLoading, 
    setLoginFail,
    loadUserCardData, 
    loginUser, 
    logoutUser,
    refreshUserSession,
    reportError,
    clearError
} = actions;
export default reducer;

