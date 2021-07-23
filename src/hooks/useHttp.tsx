import {useAppDispatch} from '../hooks';
import {reportError} from '../appData/appDataSlice';
import {appConfig} from '../helpers';
import {PutDataConfiguration, AppError} from '../interfaces';



function useHttp(){
    const dispatch = useAppDispatch();

    return {

        getData: async (endpoint:string) => {
            let data;

            const fetchUrl = appConfig.apiRoot + endpoint
            await fetch(fetchUrl)
                .then(async (response) => {
                    if(!response.ok) {
                        if(response?.body) {
                            const errObj:AppError = await response.json();
                            if(errObj.error) {
                                dispatch(reportError(errObj))
                            }
                        }
                        console.log({status: response.status, message: 'Could not execute getData', url: fetchUrl});
                        data = {error: 'could not locate that resource', status: response.status};
                    } else {
                        data = response.json();           
                    }
                })
                .catch((error) => {
                    data = {error: 'could not locate that resource', errorMsg: error};
                })
                return data;
        },



        getDataWithAuth:  async (endpoint:string) => {

            const userdata = window.localStorage.getItem('userdata')    
            let token;
            const aryHeaders:[[string, string]] = [['','']];

            if(userdata) {
                token = JSON.parse(userdata).token
            }

            if(token) {
                aryHeaders.push(['Authorization', 'Bearer ' + token])
            }

            const configData = {   
                method: 'GET', 
                headers: aryHeaders.slice(1,aryHeaders.length)
            };
            
            
            const fetchUrl = appConfig.apiRoot + endpoint
            const response = await fetch(fetchUrl, configData);   // e.g. http://mydata.xyz.com/categories

            if(!response.ok) {
                console.log({status: response.status, message: 'Could not execute getDataWithAuth', url: fetchUrl});
                throw new Error('Could not execute getDataWithAuth');
            }
            const data = await response.json();
            return data;
        },



        // works for POST, PATCH, DELETE AND PUT
        putData: async (endpoint:string, cfg:PutDataConfiguration) => {
            const userdata = window.localStorage.getItem('userdata')    
            let token;
            const aryHeaders:[[string, string]] = [['','']];

            try {
                if(userdata) {
                token = JSON.parse(userdata).token
                }
        
                if(token) {
                    aryHeaders.push(['Authorization', 'Bearer ' + token])
                }
            
                if (cfg.contentType !== 'none') {
                    aryHeaders.push(['content-type', cfg.contentType ? cfg.contentType : 'application/json'])
                }

                const configData = {   
                    method: cfg.method ? cfg.method: 'POST', 
                    body: cfg.body ? JSON.stringify(cfg.body) : null,
                    headers: aryHeaders.slice(1,aryHeaders.length)
                };    
                const fetchUrl = appConfig.apiRoot + endpoint;
                const response = await fetch(fetchUrl, configData);        

                if(!response.ok) {
                    const errorObj = {
                        status: response.status,
                        message: response.statusText,
                        putConfig: cfg
                    }
                    console.log(errorObj)
                    throw new Error('Could not execute postData');
                }
            
                const data = await response.json();
                return data;    
            } catch (error) {
                console.log(error);
                return {};
            }
            
        }

    }

}

export default useHttp;