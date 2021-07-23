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
import {app_setIsLoading, app_updateUserCardsRemaining} from './'
import {card_loadCardData, card_updateDownloadCount} from './cardDataActions'
import {SelectedSubject, CardData, CardDisplay} from '../interfaces';
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



export const cardgen_donloadOnly = (cardId: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(app_setIsLoading({
                isLoading: true,
                loadingMsg: 'Please wait, your download will begin shortly.'
            }));

            await http.getData(`/cardimage/downloadonly/${cardId}`)
            .then((response:any) => {
                const imageUrl = response.imageUrl;

                if(imageUrl) {
                    dispatch(app_setIsLoading({isLoading: false}))
                    dispatch(card_updateDownloadCount(cardId))
                    download(appConfig.apiRoot + '/' + imageUrl)
                    setTimeout(async() => {
                        const putCfg = {
                            method: 'DELETE',
                            body: {
                                imagePath: imageUrl
                            }
                        }
                        await http.getData('/cardimage', putCfg);                    
                    }, 1000)
                }
    
            })

        } catch (error) {
            console.log(error)
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
                    await dispatch(cardgen_downloadCard({...card}))
                }

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

            await http.getData(`/cardimage/${payload._id}`)
            .then((response) => {

                const {imageUrl, cardsRemaining} = response!;
                if(imageUrl) {
                    download(appConfig.apiRoot + '/' + imageUrl)
                    dispatch(card_loadCardData())
                    dispatch(app_updateUserCardsRemaining(cardsRemaining))
                    setTimeout(async() => {
                        const putCfg = {
                            method: 'DELETE',
                            body: {
                                imagePath: imageUrl
                            }
                        }
                        await http.getData('/cardimage', putCfg);                    
                    }, 1000)
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