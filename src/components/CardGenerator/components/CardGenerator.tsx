import PreLoadScreen from './PreLoadScreen';
import BingoCard from './BingoCard';
import ProbabilityReport from './ProbabilityReport'
import useSound from 'use-sound';
import {cardgen_loadData} from '../appData';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useEffect} from 'react';
import {CardGeneratorProps} from '../interfaces';
import {appConfig} from '../helpers';

const CardGenerator:React.FC<CardGeneratorProps> = (props:CardGeneratorProps) => {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector(state => state.cardGenData.uiState.screen);
  const playMusic = useAppSelector(state => state.cardGenData.uiState.playMusic);
  const savedCards = useAppSelector(state => state.cardData.savedCards)
  const {cardId} = props;
  const cardData = cardId && savedCards ? savedCards?.filter(item => item._id === cardId)[0] : null;

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
      {(currentScreen === 'GENERATE' || cardId) && 
        <>
            <BingoCard cardId={cardId} cardData={cardData} />
            <ProbabilityReport cardId={cardId} cardData={cardData} />
        </>
      }
    </div>
  );
}


export default CardGenerator;