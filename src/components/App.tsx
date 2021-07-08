import {Subjects, SplashScreen, InfoScreen, PreLoadScreen} from '../components';
import useSound from 'use-sound';
import {app_loadData} from '../appData';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useEffect} from 'react';


const App:React.FC = () => {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector(state => state.appData.uiState.screen);


  const [playOn] = useSound(
    '/dist/audio/jeopardy2.mp3',
    { volume: .5 }
  );
 
  useEffect(() => {
    dispatch(app_loadData())
  }, [dispatch])



  return (
    <div className="app">
      {currentScreen === 'STEP_1' && <SplashScreen /> }
      {currentScreen === 'STEP_2' && <InfoScreen /> }
      {currentScreen === 'STEP_3' && <PreLoadScreen handleClick={playOn} /> }      
      {currentScreen === 'STEP_4' && <Subjects />}
    </div>
  );
}

export default App;
