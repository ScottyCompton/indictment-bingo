import {
    reeinitialize, 
    loadCardGenData, 
    updateTileDisplayCount, 
    updateSelectedSubjects, 
    switchScreen, 
    setMusicState,
    setShowReport,
    setEnabledState,
    setShowGenerator} from './cardGenDataSlice';
import {app_setIsLoading, card_loadCardData} from './'
import {SelectedSubject, CardData} from '../interfaces';
import {http, appConfig} from '../helpers';
import download from 'downloadjs';

export const cardgen_loadData = () => {
    //const {subjects} = subjectData;


    return async (dispatch: any) => {
        try {
            http.getData('/games/' + appConfig.gameId + '/subjects').then((payload:any) => {
                dispatch(loadCardGenData(payload))
            })

        } catch (error) {
            dispatch(app_setIsLoading({isLoading: false}))
        }

    }    

}



export const cardgen_saveCardData = (cardData:CardData) => {

    return async (dispatch: any) => {
        try {
            const putConfig = {
                body: cardData,
                method: 'POST'
            }
            dispatch(app_setIsLoading({isLoading: true, loadingMsg: 'Saving card - your download will begin shortly'}))
            await http.getData('/cards', putConfig)
            .then(async(card:any) => {
                if(card) {
                    await dispatch(cardgen_downloadCard(card._id))
                }

            })
            .then(() => {
                dispatch(app_setIsLoading({isLoading: false}))
                dispatch(reeinitialize())
                window.location.href='/cards'
            })
            .catch((error) => {
                console.log('Could not save card data!', error)
            });
        } catch (error) {
            console.log(error)
        }
    }

}


export const cardgen_closeGenerator = () => {
    return async (dispatch: any) => {
        dispatch(cardgen_showGenerator(false))
        dispatch(cardgen_killmusic());
        dispatch(cardgen_disableRoll());
        setTimeout(() => {
            dispatch(cardgen_reeinitialize())
        }, 500)   
    }
}



export const cardgen_downloadCard = (payload: string) => {
    return async (dispatch: any) => {
        try {

            await http.getData(`/cardimage/${payload}`)
            .then((response) => {

                if(response.fullImg) {
                    download(appConfig.apiRoot + '/' + response.fullImg)
                    return response;
                }
            }).then(async (firstResp) => {
                if(firstResp.rndId) {
                    dispatch(app_setIsLoading({isLoading: true, loadingMsg: 'Almost done...'}))
                    await http.getData(`/thumbimage/${payload}/${firstResp.rndId}`)
                    .then(() => {                        
                        dispatch(card_loadCardData())
                    })
                }
            })
            
        } catch (error) {
            console.log(error)
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


export const cardgen_showGenerator = (showGenerator: boolean, cardId?:string) => {
    return async (dispatch:any) => {
        try {
            dispatch(setShowGenerator({showGenerator, cardId}));
        } catch (error) {
            console.log(error);
        }
    }
}