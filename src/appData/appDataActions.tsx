import {reeinitialize, loadAppData, updateTileDisplayCount, setAppLoading, updateSelectedSubjects, switchScreen} from './appDataSlice';
import {SelectedSubject} from '../interfaces';
import subjectData from '../fixtures/subjectData.json';


export const app_loadData = () => {
    const {subjects} = subjectData;

    return async (dispatch: any) => {
        try {
            dispatch(loadAppData(subjects));
        } catch(error) {
            console.log(error);
        }
    }

}

export const app_setLoadingState = (payload:boolean) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoading(payload));
        } catch(error) {
            console.log(error);
        }
    }
}


export const app_navigate = (payload: string) => {
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

export const app_updateSelected = (payload: SelectedSubject[]) => {
    return async (dispatch: any) => {
        try {
            dispatch(updateSelectedSubjects(payload));
        } catch(error) {
            console.log(error);
        }
    }
}



export const app_updateCompletedTileCount = () => {
    return async (dispatch: any) => {
        try {
            dispatch(updateTileDisplayCount());
        } catch(error) {
            console.log(error);
        }
    }
}


export const app_reeinitialize = () => {
    return async (dispatch: any) => {
        try {
            dispatch(reeinitialize());
        } catch(error) {
            console.log(error);
        }
    }
}