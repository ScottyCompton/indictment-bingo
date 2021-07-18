import {
    reeinitialize, 
    loadCardGenData, 
    updateTileDisplayCount, 
    updateSelectedSubjects, 
    switchScreen, 
    setMusicState,
    setShowReport,
    setEnabledState} from './cardGenDataSlice';
import {app_setIsLoading} from './'
import {card_loadCardData} from './cardDataActions'
import {SelectedSubject, CardData, CardDisplay} from '../interfaces';
import {getData, getDataWithAuth, putData, appConfig} from '../helpers';
import download from 'downloadjs';

export const cardgen_loadData = () => {
    //const {subjects} = subjectData;


    return async (dispatch: any) => {
        try {
            dispatch(app_setIsLoading({isLoading: true}))
            getData('/games/' + appConfig.gameId + '/subjects').then((payload:any) => {
                dispatch(loadCardGenData(payload))
            }).then(() => {
                dispatch(app_setIsLoading({isLoading: false}))
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
            await putData('/cards', putConfig)
            .then(async(card) => {
                await dispatch(cardgen_downloadCard({
                    _id: card._id,
                    cardName: card.cardName,
                    createdAt: card.createdAt,
                    cardThumbImg: card.cardThumbImg                    
                }))
            })
            .then(() => {
                dispatch(app_setIsLoading({isLoading: false}))
                dispatch(reeinitialize())
            })
            .catch((error) => {
                console.log('Could not save card data!', error)
            });
        } catch (error) {
            console.log(error)
        }
    }

}


export const cardgen_downloadCard = (payload: CardDisplay) => {
    return async (dispatch: any) => {
        try {

            const response = await getDataWithAuth(`/cardimage/${payload._id}`)
            const {imageUrl} = response;
            if(imageUrl) {
                download(appConfig.apiRoot + '/' + imageUrl)
                dispatch(card_loadCardData())
                setTimeout(async() => {
                    const putCfg = {
                        method: 'DELETE',
                        body: {
                            imagePath: imageUrl
                        }
                    }
                    await putData('/cardimage', putCfg);                    
                }, 1000)
            }

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
