import {store} from '../appData';
import {app_reportError} from '../appData';
import {appConfig} from '../helpers';
import {PutDataConfiguration, AppError} from '../interfaces';



const handleHttp = () => {
    const dispatch = store.dispatch;

    return {

        getData: async (endpoint:string, putConfig:PutDataConfiguration | undefined = undefined) => {
            const fetchUrl = appConfig.apiRoot + endpoint
            const userdata = window.localStorage.getItem('userdata')    
            const aryHeaders:[[string, string]] = [['','']];

            let returnData:any;
            
            if(userdata) {
                const token = JSON.parse(userdata).token
                if(token) {
                    aryHeaders.push(['Authorization', 'Bearer ' + token])
                }
            }
            
            if(putConfig) {
                if (putConfig.contentType !== 'none') {
                    aryHeaders.push(['content-type', putConfig.contentType ? putConfig.contentType : 'application/json'])
                }
    
            }

            const configData = {   
                method: putConfig ? (putConfig.method ? putConfig.method: 'POST') : 'GET', 
                body:   putConfig ? (putConfig.body ? JSON.stringify(putConfig.body) : null) : undefined,
                headers: aryHeaders.slice(1,aryHeaders.length)
            };               


            await fetch(fetchUrl, configData)
                .then(async (response) => {
                    if(!response.ok) {
                        if(response?.body) {
                            const errObj:AppError = await response.json();
                            if(errObj.error) {
                                dispatch(app_reportError(errObj))
                            }
                        }
                        console.log({status: response.status, message: 'Could not execute getData', url: fetchUrl});
                        returnData = {error: 'could not locate that resource', status: response.status};
                    } else {
                        returnData = response.json();           
                    }
                })
                .catch((error) => {
                    dispatch(app_reportError({
                        error: {
                            status: 404,
                            message: 'resource not found',
                            description: 'resource not found'
                        }
                    }))
                    //
                    returnData =  {error: 'could not locate that resource', errorMsg: error};
                })
            return returnData;
        }
    }
}

export default handleHttp;