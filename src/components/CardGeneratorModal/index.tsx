import {Modal} from 'react-bootstrap';
import {CardGenerator} from '../'
import ModalButtons from './ModalButtons';
import {CardGenModalProps} from '../../interfaces';
import {useAppSelector} from '../../hooks'
import {Button} from 'react-bootstrap'


const CardGeneratorModal:React.FC<CardGenModalProps> = (props:CardGenModalProps) => {
    const {showGenerator, handleClose} = props;
    const {screen, rollComplete} = useAppSelector(state => state.cardGenData.uiState)
    

    const handleSaveCard = () => {

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
          {screen === 'SPLASH' && <span>Trump Family Indictement Bingo</span>}
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