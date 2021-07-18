import {putData, getData} from '../helpers';
import {setAppLoading, setLoginFail, loadUserCardData, loginUser, refreshUserSession} from './appDataSlice'
import {LoginDataProps, AppDataLogin, AppLoadingPayload} from '../interfaces';
import {card_loadCardData} from './cardDataActions'


export const app_refreshUserSession = () => {
    return async (dispatch: any) => {
        try {
            let userdata = window.localStorage.getItem('userdata')!;
            
            if(userdata) {
                const payload = JSON.parse(userdata);
                dispatch(refreshUserSession(payload));
                dispatch(card_loadCardData())
            }

        } catch (error) {
            console.log(error)
            dispatch(setAppLoading({isLoading: false}))            
        }
    }
}



export const app_setIsLoading = (payload:AppLoadingPayload) => {
    return async (dispatch: any) => {
        dispatch(setAppLoading(payload))
    }
}



export const app_loadUserCardData = () => {

    return async (dispatch: any) => {
        try {
            dispatch(setAppLoading({isLoading: true}))
            const userData = window.localStorage.getItem('userdata');
            if(userData) {
                const storedData = JSON.parse(userData)
                getData(`/user/${storedData.user._id}/cards`).then((payload:any) => {
                    dispatch(loadUserCardData(payload))
                }).then(() => {
                    dispatch(setAppLoading({isLoading: false}))
                }).catch((error) => {
                    console.log('Could not load user  card data', error)
                    dispatch(setAppLoading({isLoading: false}))
                }) 
            } else {
                throw new Error('Could not load user card data - no user data found in localStorage')
            }

        } catch (error) {
            dispatch(setAppLoading({isLoading: false}))
        }
    }    
}


export const app_executeLogin = (loginData:LoginDataProps) => {
    return async (dispatch: any) => {
        try {
            const putConfig = {
                body: {
                    email: loginData.username,
                    password: loginData.password
                }
            }
            dispatch(setAppLoading({isLoading: true, loadingMsg: 'Logging in...'}))

           await putData('/users/login',putConfig)
            .then((result:AppDataLogin | null) => {
                if(result && result.token) {
                    dispatch(setLoginFail(false))
                    localStorage.setItem('userdata', JSON.stringify(result));
                    dispatch(card_loadCardData())
                    dispatch(loginUser(result))
                }
           }).then(() => {
            dispatch(setLoginFail(true));
            dispatch(setAppLoading({isLoading: false}))

            });

        } catch (error) {
            console.log(error);
        }
    }
}
