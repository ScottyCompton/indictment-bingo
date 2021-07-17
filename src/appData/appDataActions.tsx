import {putData, getData} from '../helpers';
import {setAppLoading, setLoginFail, loadUserCardData, loginUser, refreshUserSession} from './appDataSlice'
import {LoginDataProps, AppDataLogin} from '../interfaces';


export const app_refreshUserSession = () => {
    return async (dispatch: any) => {
        dispatch(setAppLoading(true))
        try {
            let userdata = window.localStorage.getItem('userdata')!;
            
            if(userdata) {
                const payload = JSON.parse(userdata);
                dispatch(refreshUserSession(payload));
            }
            dispatch(setAppLoading(false))
                        
        } catch (error) {
            console.log(error)
        }
    }
}



export const app_setIsLoading = (payload:boolean) => {
    return async (dispatch: any) => {
        dispatch(setAppLoading(payload))        
    }
}



export const app_loadUserCardData = () => {

    return async (dispatch: any) => {
        try {
            setAppLoading(true)
            const userData = window.localStorage.getItem('userdata');
            if(userData) {
                const storedData = JSON.parse(userData)
                getData(`/user/${storedData.user._id}/cards`).then((payload:any) => {
                    dispatch(loadUserCardData(payload))
                }).then(() => {
                    setAppLoading(false);
                }).catch((error) => {
                    console.log('Could not load user  card data', error)
                    setAppLoading(false);                
                }) 
            } else {
                throw new Error('Could not load user card data - no user data found in localStorage')
            }

        } catch (error) {
            setAppLoading(false)
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
            setAppLoading(true)
           await putData('/users/login',putConfig)
            .then((result:AppDataLogin | null) => {
                console.log(result)
                if(result && result.token) {
                    dispatch(setLoginFail(false))
                    dispatch(loginUser(result))
                    localStorage.setItem('userdata', JSON.stringify(result));
                }
           }).then(() => {
            dispatch(setLoginFail(true));
            dispatch(setAppLoading(false));
        });

        } catch (error) {
            console.log(error);
        }
    }
}
