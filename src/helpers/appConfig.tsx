
import {AppConfig} from '../interfaces'


const appConfig:AppConfig = {
    rollImgRoot: process.env.REACT_APP_ROLLERS_IMG_ROOT!,
    audioRoot: process.env.REACT_APP_AUDIO_ROOT!,
    subjImgRoot: process.env.REACT_APP_SUBJECT_IMG_ROOT!,
    cardThumbImgRoot: process.env.REACT_APP_API_ROOT + process.env.REACT_APP_THUMB_IMG_ROOT!,
    playLength: 18000,
    apiRoot: process.env.REACT_APP_API_ROOT!,
    gameId: process.env.REACT_APP_GAME_ID!,
    cardDownloadLimit: 3
}


export default appConfig;