import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardGenDataState, Subject, SelectedSubject} from '../interfaces';



const initialState: CardGenDataState = {
    subjects: [],
    uiState: {
        screen: 'SPLASH',
        selectedSubjects: [],
        isLoading: true,
        enabled: false,
        playMusic: false,
        tileDisplayCount: 0,
        rollComplete: false,
        showReport: false,
        probabilityMatrix:  {
            vals: [[]],
            rowProbs: [],
            colProbs: [],
            diagProbs: []
        }
    }
}

const getRowProbs = (matrix:[number[]]) => {
    const arrOut:number[] = [];
    matrix.forEach((row) => {
        arrOut.push(Math.min(...row))
    })
    return arrOut;
}

const getColProbs = (matrix:[number[]]) => {
    const transposedMatrix:any  = transposeMatrix(matrix);
    const arrOut:number[] = getRowProbs(transposedMatrix);
    return arrOut;
}



const transposeMatrix = (matrix:[number[]]) => {
    let arrOut = matrix;
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < i; j++) {
            let tmp = arrOut[i][j];
            arrOut[i][j] = arrOut[j][i];
            arrOut[j][i] = tmp;
        }
    }
    return arrOut;
}


const getDiagProbs = (matrix:any) =>{
    const arrLTR: number[] = [];
    const arrRTL: number[] = [];
    const arrOut: number[] = [];

    for(let i = 0; i < matrix.length; i++) {
        arrLTR.push(matrix[i][i])
    }        
    arrOut.push(Math.min(...arrLTR));   

    for(let i = 0; i < matrix.length; i++) {
        arrRTL.push(matrix[i][(matrix.length-1)-i])
    }


    // arrRTL.push(matrix[0][4]);
    // arrRTL.push(matrix[1][3]);
    // arrRTL.push(matrix[2][2]);
    // arrRTL.push(matrix[3][1]);
    // arrRTL.push(matrix[4][0]);

    arrOut.push(Math.min(...arrRTL));   
  
    return arrOut;
}




const cardGenDataSlice = createSlice({
    name: 'cardGenData',
    initialState: initialState,
    reducers: {

        reeinitialize(state) {
             state.uiState = initialState.uiState;
             //state.selectedSubjects = [];
            
        },

        setAppLoading(state, action: PayloadAction<boolean>) {
            state.uiState.isLoading = action.payload;
        },

        updateSelectedSubjects(state, action:PayloadAction<SelectedSubject[]>) {
            state.uiState.selectedSubjects = action.payload;
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

        setShowReport(state, action: PayloadAction<boolean>) {
            state.uiState.showReport = action.payload;
        },

        updateTileDisplayCount(state) {

            state.uiState.tileDisplayCount++;
            if((state.uiState.tileDisplayCount === state.uiState.selectedSubjects.length)) {
                state.uiState.rollComplete = true;
                
                let tmpArr: number[] = [];
                let matrix: [number[]] = [[]];

                matrix.splice(0,1);
                for(let i = 0; i <= state.uiState.selectedSubjects.length; i++) {

                    if(state.uiState.selectedSubjects[i]) {
                        tmpArr.push(state.uiState.selectedSubjects[i].probability)
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
    setShowReport} = actions;
export default reducer;

