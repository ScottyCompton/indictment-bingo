import appConfig from './appConfig'
import handleHttp from './handleHttp';

const http = handleHttp();

export {
    appConfig,
    http
}







// //const rootUrl = process.env.REACT_APP_API_ROOT;
// import {AppConfig, PutDataConfiguration} from '../interfaces';



// export const getData = async (endpoint:string) => {
//     let data;

//     const fetchUrl = appConfig.apiRoot + endpoint
//     await fetch(fetchUrl)
//         .then(async (response) => {
//             if(!response.ok) {
//                 console.log({status: response.status, message: 'Could not execute getData', url: fetchUrl});
//                 data = {error: 'could not locate that resource', status: response.status};
//             } else {
//                 data = response.json();           
//             }
//         })
//         .catch((error) => {
//             data = {error: 'could not locate that resource', errorMsg: error};
//         })
//         return data;
//         // e.g. http://mydata.xyz.com/categories

// }



// export const getDataWithAuth = async (endpoint:string) => {

//     const userdata = window.localStorage.getItem('userdata')    
//     let token;
//     const aryHeaders:[[string, string]] = [['','']];

//     if(userdata) {
//         token = JSON.parse(userdata).token
//      }

//     if(token) {
//         aryHeaders.push(['Authorization', 'Bearer ' + token])
//     }

//     const configData = {   
//         method: 'GET', 
//         headers: aryHeaders.slice(1,aryHeaders.length)
//     };
    
    
//     const fetchUrl = appConfig.apiRoot + endpoint
//     const response = await fetch(fetchUrl, configData);   // e.g. http://mydata.xyz.com/categories

//     if(!response.ok) {
//         console.log({status: response.status, message: 'Could not execute getDataWithAuth', url: fetchUrl});
//         throw new Error('Could not execute getDataWithAuth');
//     }
//     const data = await response.json();
//     return data;
// }



// // works for POST, PATCH, DELETE AND PUT
// export const putData = async (endpoint:string, cfg:PutDataConfiguration) => {
//     const userdata = window.localStorage.getItem('userdata')    
//     let token;
//     const aryHeaders:[[string, string]] = [['','']];

//     try {
//         if(userdata) {
//            token = JSON.parse(userdata).token
//         }
   
//         if(token) {
//             aryHeaders.push(['Authorization', 'Bearer ' + token])
//         }
    
//         if (cfg.contentType !== 'none') {
//             aryHeaders.push(['content-type', cfg.contentType ? cfg.contentType : 'application/json'])
//         }

//         const configData = {   
//             method: cfg.method ? cfg.method: 'POST', 
//             body: cfg.body ? JSON.stringify(cfg.body) : null,
//             headers: aryHeaders.slice(1,aryHeaders.length)
//         };    
//         const fetchUrl = appConfig.apiRoot + endpoint;
//         const response = await fetch(fetchUrl, configData);        

//         if(!response.ok) {
//             const errorObj = {
//                 status: response.status,
//                 message: response.statusText,
//                 putConfig: cfg
//             }
//             console.log(errorObj)
//             throw new Error('Could not execute postData');
//         }
    
//         const data = await response.json();
//         return data;    
//     } catch (error) {
//         console.log(error);
//         return {};
//     }
    
// }

// export const appConfig:AppConfig = {
//         rollImgRoot: process.env.REACT_APP_ROLLERS_IMG_ROOT!,
//         audioRoot: process.env.REACT_APP_AUDIO_ROOT!,
//         subjImgRoot: process.env.REACT_APP_SUBJECT_IMG_ROOT!,
//         cardThumbImgRoot: process.env.REACT_APP_API_ROOT + process.env.REACT_APP_THUMB_IMG_ROOT!,
//         playLength: 18000,
//         apiRoot: process.env.REACT_APP_API_ROOT!,
//         gameId: process.env.REACT_APP_GAME_ID!,
//         cardDownloadLimit: 3
//     }