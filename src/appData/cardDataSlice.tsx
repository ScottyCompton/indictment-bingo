import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SavedCardData, SavedCardState} from '../interfaces';

const initialState:SavedCardState = {
    savedCards: []
}


const cardDataSlice = createSlice({
    name: 'cardData',
    initialState: initialState,
    reducers: {
        loadCardData(state, action: PayloadAction<SavedCardData[]>) {
            state.savedCards = action.payload;
        }
    }
});



const {actions, reducer} = cardDataSlice;

export const {loadCardData} = actions;
export default reducer;
