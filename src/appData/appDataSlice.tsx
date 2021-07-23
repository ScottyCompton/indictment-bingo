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
                state.uiState.loadingMsg = 'Loading data, please wait...'
            }
        },


        loadUserCardData(state, action: PayloadAction<UserCard[]>) {
            state.uiState.userCards = action.payload;
        },

        loginUser(state, action: PayloadAction<any>) {
            state.uiState.user = action.payload.user;
            state.uiState.token = action.payload.token;
        },

        updateUserCardsRemaining(state, action: PayloadAction<number>) {
            // update the number of cards for the user in redux state
            // after a user has generated another card.            
            if(state?.uiState?.user?.cardsRemaining) {
                state.uiState.user.cardsRemaining = action.payload;
                const userdata = {
                    token: state.uiState.token,
                    user: state.uiState.user
                }
                localStorage.setItem('userdata', JSON.stringify(userdata));

            }
        },

        setLoginFail(state, action: PayloadAction<boolean>) {
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
    updateUserCardsRemaining, 
    setAppLoading, 
    setLoginFail,
    loadUserCardData, 
    loginUser, 
    refreshUserSession,
    reportError,
    clearError
} = actions;
export default reducer;

