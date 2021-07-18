import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDataLogin, AppDataState, UserCard, AppLoadingPayload} from '../interfaces'


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
                state.uiState.loadingMsg = 'Loading data, please wait...'
            }
        },


        loadUserCardData(state, action: PayloadAction<UserCard[]>) {
            state.uiState.userCards = action.payload;
        },

        loginUser(state, action: PayloadAction<AppDataLogin>) {
            state.uiState.user = action.payload.user;
            state.uiState.token = action.payload.token;
        },

        setLoginFail(state, action: PayloadAction<boolean>) {
            console.log(action.payload)
            if(action.payload) {
                state.uiState.loginFail = true;
            } else {
                state.uiState.loginFail = undefined;
            }
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

export const {setAppLoading, setLoginFail, loadUserCardData, loginUser, refreshUserSession} = actions;
export default reducer;

