import {getDataWithAuth, putData, appConfig} from '../helpers';
import {loadCardData} from './cardDataSlice'
import {app_setIsLoading} from './'
import {SavedCardData} from '../interfaces';



export const card_loadCardData = () => {
    return async (dispatch: any) => {
        try {
            dispatch(app_setIsLoading({isLoading: true, loadingMsg: 'Loading card data...'}))
            await getDataWithAuth(`/games/${appConfig.gameId}/cards`)
                .then((cardData:SavedCardData[]) => {
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


export const card_deleteCard = (cardId: any) => {
    return async (dispatch: any) => {
        try {
            const putCfg = {
                method: 'DELETE',
                body: {cardId}
            }
            await putData(`/cards`, putCfg)
                .then((retval) => {
                    dispatch(card_loadCardData())
                })
        } catch (error) {
            console.log('Could not delete card - ' + error);
        }
    }
}