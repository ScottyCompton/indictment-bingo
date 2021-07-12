import {configureStore} from '@reduxjs/toolkit';
import cardGenDataReducer from './cardGenDataSlice';
import appDataReducer from './appDataSlice';

export const store = configureStore({
    reducer: {
        cardGenData: cardGenDataReducer,
        appData: appDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;