import {BingoCard, SplashScreen, PreLoadScreen} from './';
import useSound from 'use-sound';
import {cardgen_loadData} from '../../appData';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';


const CardGenerator:React.FC = () => {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector(state => state.cardGenData.uiState.screen);
  const playMusic = useAppSelector(state => state.cardGenData.uiState.playMusic);

  const [playOn, {stop}] = useSound(
    '/dist/audio/spanish_flea.mp3',
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
      {currentScreen === 'SPLASHSCREEN' && <SplashScreen /> }
      {currentScreen === 'PRELOADSCREEN' && <PreLoadScreen handleClick={handleClick} /> }      
      {currentScreen === 'GENERATE' && <BingoCard />}
    </div>
  );
}

export default CardGenerator;
