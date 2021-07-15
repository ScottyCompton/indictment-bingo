import {Modal} from 'react-bootstrap';
import {CardGenerator} from '../'
import ModalButtons from './ModalButtons';
import {CardGenModalProps, UserCard} from '../../interfaces';
import {useAppSelector, useAppDispatch} from '../../hooks'
import {Button} from 'react-bootstrap'
import {cardgen_saveCardData} from '../../appData'
import {appConfig} from '../../helpers';
import {useEffect, useState} from 'react';
import useSound from 'use-sound';


const CardGeneratorModal:React.FC<CardGenModalProps> = (props:CardGenModalProps) => {
    const {showGenerator, handleClose} = props;
    const {screen, rollComplete, selectedSubjects, probabilityMatrix} = useAppSelector(state => state.cardGenData.uiState)
    const {user} = useAppSelector(state => state.appData.uiState)
    const [playSound, setPlaySound] = useState(false)


    const dispatch = useAppDispatch();

    const [playOn, {stop}] = useSound(
      `${appConfig.audioRoot}/chosenone.mp3`,
      { volume: .5 }
    );
   

    useEffect(() => {
      if(playSound) {
        playOn();
      } else {
        stop();
      }
      
    }, [playSound, playOn, stop])




    const handleSaveCard = () => {
        if(user) {
          setPlaySound(true)
          const userId = user._id;
          const userCardData:UserCard = {
            selectedSubjects,
            userId,
            probabilityMatrix: JSON.stringify(probabilityMatrix.vals),
            cardName: 'Some New Card',
            gameId: appConfig.gameId,
          }
          dispatch(cardgen_saveCardData(userCardData));
          //handleClose();
          
        }
    }


    return (
        <Modal 
        id="cardgen-modal"
        backdrop="static"
        keyboard={false}
        centered aria-labelledby="contained-modal-title-vcenter"
        show={showGenerator} 
        onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {screen === 'SPLASH' && <span>Trump World Indictment Bingo</span>}
            {screen === 'PRELOAD' && <span>Indictments are coming... please wait</span>}
            {(screen === 'GENERATE' && !rollComplete) && <span>Generating your Bingo card</span>}
            {(screen === 'GENERATE' && rollComplete) && <span>Your card is ready!</span>}
          </Modal.Title>
          {(rollComplete && screen==='GENERATE') && <Button variant="btn btn-success btn-sm" onClick={handleSaveCard}>Save Card</Button>}          
        </Modal.Header>
        <Modal.Body className="card-generator-modal__body">
          <CardGenerator />
        </Modal.Body>        
        <Modal.Footer>
          <ModalButtons handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
    )
}

export default CardGeneratorModal