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
        },
        updateDownloadCount(state, action: PayloadAction<string>) {
            if(state.savedCards) {
                const cardIdx = state.savedCards.findIndex(item => item._id === action.payload);
                if(cardIdx !== -1) {
                    state.savedCards[cardIdx].downloadCount = state.savedCards[cardIdx].downloadCount + 1;
                }

            }
        }
    }
});



const {actions, reducer} = cardDataSlice;

export const {loadCardData, updateDownloadCount} = actions;
export default reducer;
