import {http, appConfig} from '../helpers';
import {loadCardData, updateDownloadCount} from './cardDataSlice'
import {app_setIsLoading} from './'




export const card_loadCardData = () => {
    return async (dispatch: any) => {
        try {
            dispatch(app_setIsLoading({isLoading: true, loadingMsg: 'Loading card data...'}))
            await http.getData(`/games/${appConfig.gameId}/cards`)
                .then((cardData) => {
                    dispatch(loadCardData(cardData))
                })
                .then(() => {
                    dispatch(app_setIsLoading({isLoading: false}))
                })
                .catch((error) => {
                    console.log('Could not load User\'s card data - ' + error)
                })

            } catch (error) {
                dispatch(app_setIsLoading({isLoading: false}))
                console.log('Could not load User\'s card data - ' + error)
            }
    }
}


export const card_updateDownloadCount = (cardId: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(updateDownloadCount(cardId))
        } catch (error) {
            console.log(error)
        }
    }
}


export const card_deleteCard = (cardId: any) => {
    return async (dispatch: any) => {
        try {
            const putCfg = {
                method: 'DELETE',
                body: {cardId}
            }
            await http.getData(`/cards`, putCfg)
                .then((retval) => {
                    dispatch(card_loadCardData())
                })
        } catch (error) {
            console.log('Could not delete card - ' + error);
        }
    }
}