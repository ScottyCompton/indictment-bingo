import {Modal} from 'react-bootstrap';
import CardGenerator from './CardGenerator'
import ModalButtons from './ModalButtons';
import {UserCard} from '../interfaces';
import {useAppSelector, useAppDispatch} from '../hooks';
import {Button} from 'react-bootstrap'
import {cardgen_saveCardData, cardgen_closeGenerator} from '../appData'
import {appConfig} from '../helpers';
import {useEffect, useState} from 'react';
import useSound from 'use-sound';


const CardGeneratorModal:React.FC = () => {
    //const {handleClose} = props;
    const {screen, rollComplete, selectedSubjects, probabilityMatrix} = useAppSelector(state => state.cardGenData.uiState)
    const {user} = useAppSelector(state => state.appData.uiState);
    const {cardId} = useAppSelector(state => state.cardGenData.uiState)
    const {showGenerator} = useAppSelector(state => state.cardGenData.uiState);
    const [show, setShow] = useState(false);
    const [playSound, setPlaySound] = useState(false)


    const dispatch = useAppDispatch();

    const [playOn, {stop}] = useSound(
      `${appConfig.audioRoot}/chosenone.mp3`,
      { volume: 1 }
    );
   
    
    useEffect(() => {
      if(showGenerator) {
        setPlaySound(false);
        setShow(true)
      } else {
        setShow(false)
      }
    }, [showGenerator])


    useEffect(() => {
      if(playSound) {
        playOn();
      } else {
        stop();
      }
      
    }, [playSound, playOn, stop])


    const handleClose = () => {
      dispatch(cardgen_closeGenerator())
    }



    const handleSaveCard = () => {
        if(user) {
          setPlaySound(true)
          const userCardData:UserCard = {
            selectedSubjects,
            probabilityMatrix: JSON.stringify(probabilityMatrix),
            cardName: 'Some New Card',
            gameId: appConfig.gameId,
          }
          dispatch(cardgen_saveCardData(userCardData));
          handleClose();
          
        }
    }


    return (
        <Modal 
        id="cardgen-modal"
        contentClassName="card-generator-modal bg-primary"
        backdrop="static"
        keyboard={false}
        centered aria-labelledby="contained-modal-title-vcenter"
        show={show} 
        onHide={handleClose}>
        <Modal.Header>
          {!cardId && 
            <h6 className="text-warning">
              {screen === 'PRELOAD' && <span>Indictments are coming... please wait</span>}
              {(screen === 'GENERATE' && !rollComplete) && <span>Generating your Bingo card... please wait</span>}
              {(screen === 'GENERATE' && rollComplete) && <span>Your card is ready!</span>}
            </h6>
          }
          {cardId && 
            <h6 className="text-warning">Your Saved Bingo Card</h6>
          }
          {!cardId && (rollComplete && screen==='GENERATE') && <Button variant="btn btn-sm btn-warning btn-sm" onClick={handleSaveCard}>Save Card</Button>}          
        </Modal.Header>
        <Modal.Body className="card-generator-modal__body">
          <CardGenerator cardId={cardId} />
        </Modal.Body>        
        <Modal.Footer>
          <ModalButtons cardId={cardId} handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
    )
}

export default CardGeneratorModal