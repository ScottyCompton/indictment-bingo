import {configureStore} from '@reduxjs/toolkit';
import cardGenDataReducer from '../components/CardGenerator/appData/cardGenDataSlice';
import appDataReducer from './appDataSlice';
import cardDataReducer from './cardDataSlice'

export const store = configureStore({
    reducer: {
        cardGenData: cardGenDataReducer,
        appData: appDataReducer,
        cardData: cardDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;