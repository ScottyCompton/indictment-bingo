import {putData} from '../helpers';
import {setAppLoading, loadData, loginUser, refreshUserSession} from './appDataSlice'
import {LoginDataProps, AppUser} from '../interfaces';


export const app_refreshUserSession = () => {
    return async (dispatch: any) => {
        dispatch(setAppLoading(true))
        try {
            const user = window.localStorage.getItem('user');
            if(user) {
                dispatch(refreshUserSession(JSON.parse(user)));
                dispatch(setAppLoading(false))
            }
        } catch (error) {
            console.log(error)
        }
    }
}




export const app_loadData = () => {
    //const {subjects} = subjectData;

    return async (dispatch: any) => {
        try {
            //setAppLoading(true)
            // getData('games/' + gameId + '/subjects').then((payload:any) => {
            //     dispatch(loadData())
            // }).then(() => {
            //     setAppLoading(false);
            // })
            dispatch(loadData);
            setAppLoading(false);

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
                    ...loginData,
                    email: loginData.username
                }
            }

           await putData('users/login',putConfig)
            .then((result:AppUser | null) => {
                if(result && result.token) {
                    dispatch(loginUser(result))
                    localStorage.setItem('user', JSON.stringify(result));
                }
           });

        } catch (error) {
            console.log(error);
        }
    }
}
