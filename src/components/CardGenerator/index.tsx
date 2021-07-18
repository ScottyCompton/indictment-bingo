import InfoScreen from './InfoScreen';
import PreLoadScreen from './PreLoadScreen';
import GenerateScreen from './GenerateScreen';
import SubjectTile from './SubjectTile';
import useSound from 'use-sound';
import {cardgen_loadData} from '../../appData';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {CardGeneratorProps} from '../../interfaces';
import {appConfig} from '../../helpers';


const CardGenerator:React.FC<CardGeneratorProps> = (props:CardGeneratorProps) => {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector(state => state.cardGenData.uiState.screen);
  const playMusic = useAppSelector(state => state.cardGenData.uiState.playMusic);
  const {cardId} = props;

  const [playOn, {stop}] = useSound(
    `${appConfig.audioRoot}/spanish_flea.mp3`,
    { volume: .5 }
  );
 
  useEffect(() => {
    if(!cardId) {
      dispatch(cardgen_loadData());
    }
  }, [dispatch, cardId])

  useEffect(() => {
    if(!cardId) {
      if(!playMusic) {
        stop();
      } else {
        playOn();
      }
  
    }
  }, [playMusic, stop, playOn, cardId])

  const handleClick = () => {

  }



  return (
    <div className="app">
      {!cardId && currentScreen === 'PRELOAD' && <PreLoadScreen handleClick={handleClick} /> }      
      {(currentScreen === 'GENERATE' || cardId) && <GenerateScreen cardId={cardId} />}
    </div>
  );
}


export  {InfoScreen, PreLoadScreen, GenerateScreen, SubjectTile}
export default CardGenerator;