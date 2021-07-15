import InfoScreen from './InfoScreen';
import PreLoadScreen from './PreLoadScreen';
import SplashScreen from './SplashScreen';
import GenerateScreen from './GenerateScreen';
import SubjectTile from './SubjectTile';
import useSound from 'use-sound';
import {cardgen_loadData} from '../../appData';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {appConfig} from '../../helpers';


const CardGenerator:React.FC = () => {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector(state => state.cardGenData.uiState.screen);
  const playMusic = useAppSelector(state => state.cardGenData.uiState.playMusic);

  const [playOn, {stop}] = useSound(
    `${appConfig.audioRoot}/spanish_flea.mp3`,
    { volume: .5 }
  );
 
  useEffect(() => {
    dispatch(cardgen_loadData());
  }, [dispatch])

  useEffect(() => {
    if(!playMusic) {
      stop();
    } else {
      playOn();
    }
  }, [playMusic, stop, playOn])

  const handleClick = () => {

  }

  return (
    <div className="app">
      {currentScreen === 'SPLASH' && <SplashScreen /> }
      {currentScreen === 'PRELOAD' && <PreLoadScreen handleClick={handleClick} /> }      
      {currentScreen === 'GENERATE' && <GenerateScreen />}
    </div>
  );
}


export  {InfoScreen, PreLoadScreen, SplashScreen, GenerateScreen, SubjectTile}
export default CardGenerator;