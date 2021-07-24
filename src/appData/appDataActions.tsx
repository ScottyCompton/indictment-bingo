import {setAppLoading, logoutUser, clearError, setLoginFail, loadUserCardData, loginUser, refreshUserSession, reportError} from './appDataSlice'
import {AppLoadingPayload, AppError} from '../interfaces';
import {card_loadCardData} from './cardDataActions'
import {http} from '../helpers';

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
                http.getData(`/user/${storedData.user._id}/cards`)
                .then((payload:any) => {
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


export const app_logoutUser = () => {
    return async (dispatch: any) => {
        try {
            dispatch(logoutUser())
        } catch (error) {
            console.log(error);
        }
    }
}


export const app_setLoginFail = (loginFail: boolean) => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoginFail(loginFail))
        } catch (error) {
            console.log(error);
        }
    }
}


export const app_loginUser = (result:any) => {
    return async (dispatch: any) =>{
        try {
            localStorage.setItem('userdata', JSON.stringify(result));
            dispatch(loginUser(result))
            dispatch(card_loadCardData())
            dispatch(setAppLoading({isLoading: false}))
        } catch (error) {
            console.log(error);
        }
    }
}



// export const app_executeLogin = (loginData:LoginDataProps) => {
//     return async (dispatch: any) => {
//         try {
//             const putConfig = {
//                 body: {
//                     email: loginData.username,
//                     password: loginData.password
//                 }
//             }
//             dispatch(setAppLoading({isLoading: true, loadingMsg: 'Logging in...'}))
//            await http.getData('/users/login',putConfig)
//             .then((result) => {
//                 if(result && result.user) {
//                     localStorage.setItem('userdata', JSON.stringify(result));
//                     dispatch(card_loadCardData())
//                     dispatch(loginUser(result))
//                 }
//            }).then(() => {
//             dispatch(setLoginFail(true));
//             dispatch(setAppLoading({isLoading: false}))

//             });

//         } catch (error) {
//             console.log(error);
//         }
//     }
// }


export const app_clearError = () => {
    return async (dispatch: any) => {
        try {
          dispatch(clearError())

        } catch (error) {
            console.log(error);
        }
    }   
}



export const app_reportError = (err: AppError) => {    
    return async (dispatch: any) => {
        dispatch(app_setIsLoading({isLoading: false}));
        try {
          dispatch(reportError(err))

        } catch (error) {
            console.log(error);
        }
    }
}
