import {configureStore} from '@reduxjs/toolkit';
import appDataReducer from './appDataSlice';

export const appData = configureStore({
    reducer: {
        appData: appDataReducer
    }
})

export type RootState = ReturnType<typeof appData.getState>
export type AppDispatch = typeof appData.dispatch;