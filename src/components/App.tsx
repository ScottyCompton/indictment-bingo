import Subjects from './Subjects';
import {useState} from 'react';
import Splash from './SplashScreen';
import InfoScreen from './InfoScreen';
import PreLoadScreen from './PreLoadScreen';
import useSound from 'use-sound';


const App:React.FC = () => {
  const [appState, setAppState] = useState('STEP1');

  const [playOn] = useSound(
    '/dist/audio/jeopardy2.mp3',
    { volume: .5 }
  );

  const doNavigate = (newState:string) => {
    setAppState(newState);
    if(newState === 'STEP4') {
      playOn();
    }
  }
 

  return (
    <div className="app">
      {appState === 'STEP1' && <Splash onNav={doNavigate}  /> }
      {appState === 'STEP2' && <InfoScreen onNav={doNavigate}  /> }
      {appState === 'STEP3' && <PreLoadScreen onNav={doNavigate}  /> }      
      {appState === 'STEP4' && <Subjects onNav={doNavigate}  />}
    </div>
  );
}

export default App;
