import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardGenDataState, Subject, SelectedSubject} from '../interfaces';



const initialState: CardGenDataState = {
    subjects: [],
    selectedSubjects: [],
    uiState: {
        screen: 'SPLASHSCREEN',
        isLoading: true,
        enabled: false,
        playMusic: false,
        tileDisplayCount: 0,
        rollComplete: false,
        tileTimers: [],
        probabilityMatrix:  {
            vals: [[]],
            rowProbs: [],
            colProbs: [],
            diagProbs: []
        }
    }
}

const getRowProbs = (rows:[number[]]) => {
    const arrOut:number[] = [];
    rows.forEach((row) => {
        arrOut.push(Math.min(...row))
    })
    return arrOut;
}

const getColProbs = (rows:[number[]]) => {
    const cols:any  = transposeMatrix(rows);
    const arrOut:number[] = getRowProbs(cols);
    return arrOut;
}


const transposeMatrix = (matrix: [number[]]) => {
    const arrOut = matrix;
    for (let row = 0; row < arrOut.length; row++) {
      for (let column = 0; column < row; column++) {
        let temp = matrix[row][column]
        arrOut[row][column] = arrOut[column][row]
        arrOut[column][row] = temp
      }
    }
    return arrOut;
  }


const getDiagProb = (ltr:boolean = true, rows:[number[]]) => {
    const arrOut:number[] = [];

    if(ltr) {
        for(let i = 0; i < rows.length-1; i++) {
            arrOut.push(rows[i][i])
        }        
    } else {
        for(let i = rows.length-1; i >= 0; i--) {
            arrOut.push(rows[i][i])
        }        
    }
    return Math.min(...arrOut);

}



const getDiagProbs = (rows:[number[]]) =>{
    const arrOut: number[] = [];

    arrOut.push(getDiagProb(true, rows));
    arrOut.push(getDiagProb(false, rows));
    return arrOut;
}




const cardGenDataSlice = createSlice({
    name: 'cardGenData',
    initialState: initialState,
    reducers: {

        reeinitialize(state) {
            state.uiState = initialState.uiState;
            state.selectedSubjects = [];
        },

        setAppLoading(state, action: PayloadAction<boolean>) {
            state.uiState.isLoading = action.payload;
        },

        updateSelectedSubjects(state, action:PayloadAction<SelectedSubject[]>) {
            state.selectedSubjects = action.payload;
        },

        loadCardGenData(state, action: PayloadAction<Subject[]>) {
            state.subjects = action.payload;
        },

        switchScreen(state, action: PayloadAction<string>) {
            state.uiState.screen = action.payload;
        },

        setEnabledState(state, action: PayloadAction<boolean>) {
            state.uiState.enabled = action.payload;
        },

        setMusicState(state, action: PayloadAction<boolean>) {
            state.uiState.playMusic = action.payload;
        },

        addTimer(state, action:PayloadAction<number>) {
            state.uiState.tileTimers.push(action.payload);
        },

        killTimers(state) {
            state.uiState.tileTimers.forEach((timer:number) => {
                window.clearTimeout(timer);
            })
        },

        updateTileDisplayCount(state) {

            state.uiState.tileDisplayCount++;
            if((state.uiState.tileDisplayCount === state.selectedSubjects.length)) {
                state.uiState.rollComplete = true;
                
                let tmpArr: number[] = [];
                let matrix: [number[]] = [[]];

                matrix.splice(0,1);
                for(let i = 0; i <= state.selectedSubjects.length; i++) {

                    if(state.selectedSubjects[i]) {
                        tmpArr.push(state.selectedSubjects[i].probability)
                    }
                    
                    if((i+1) % 5 === 0) {
                        matrix.push(tmpArr);
                        tmpArr = [].slice();
                    }

                }
                state.uiState.probabilityMatrix.vals = matrix;


                state.uiState.probabilityMatrix.rowProbs = getRowProbs(matrix);
                state.uiState.probabilityMatrix.colProbs = getColProbs(matrix);
                state.uiState.probabilityMatrix.diagProbs = getDiagProbs(matrix);            
                
            }
            
        }

    }
})

const {actions, reducer} = cardGenDataSlice;

export const {
    reeinitialize, 
    loadCardGenData,
    updateTileDisplayCount, 
    setAppLoading, 
    updateSelectedSubjects, 
    switchScreen, 
    setMusicState,
    setEnabledState,
    addTimer,
    killTimers} = actions;
export default reducer;

