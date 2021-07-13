import {
    reeinitialize, 
    loadCardGenData, 
    updateTileDisplayCount, 
    setAppLoading, 
    updateSelectedSubjects, 
    switchScreen, 
    setMusicState,
    setShowReport,
    setEnabledState} from './cardGenDataSlice';
import {SelectedSubject} from '../interfaces';
import {getData} from '../helpers';


const gameId = '60e9a5497bda5d4944a562d6'; // hardcode for now

export const cardgen_loadData = () => {
    //const {subjects} = subjectData;


    return async (dispatch: any) => {
        try {
            setAppLoading(true)
            getData('games/' + gameId + '/subjects').then((payload:any) => {
                dispatch(loadCardGenData(payload))
            }).then(() => {
                setAppLoading(false);
            })

        } catch (error) {
            setAppLoading(false)
        }

    }    

}

export const cardgen_setLoadingState = (payload:boolean) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoading(payload));
        } catch(error) {
            console.log(error);
        }
    }
}


export const cardgen_navigate = (payload: string) => {
    return async (dispatch: any) => {
        try {
            setTimeout(() => {
                dispatch(switchScreen(payload));
            }, 750)
        } catch(error) {
            console.log(error);
        }
    }
}

export const cardgen_updateSelected = (payload: SelectedSubject[]) => {
    return async (dispatch: any) => {
        try {
            dispatch(updateSelectedSubjects(payload));
        } catch(error) {
            console.log(error);
        }
    }
}



export const cardgen_updateCompletedTileCount = () => {
    return async (dispatch: any) => {
        try {
            dispatch(updateTileDisplayCount());
        } catch(error) {
            console.log(error);
        }
    }
}

export const cardgen_killmusic = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setMusicState(false));
        } catch (error) {
            console.log(error)
        }
    }
}


export const cardgen_queuemusic = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setMusicState(true));
        } catch (error) {
            console.log(error)
        }
    }
}


export const cardgen_reeinitialize = () => {
    return async (dispatch: any) => {
        try {
            dispatch(reeinitialize());
        } catch(error) {
            console.log(error);
        }
    }
}

export const cardgen_showReport = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setShowReport(true))
        } catch (error) {
            console.log(error)
        }
    }
}


export const cardgen_showCard = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setShowReport(false))
        } catch (error) {
            console.log(error)
        }
    }
}



export const cardgen_enableRoll = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setEnabledState(true));
        } catch(error) {
            console.log(error);
        }
    }  
}



export const cardgen_disableRoll = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setEnabledState(false));
        } catch(error) {
            console.log(error);
        }
    }  
}
