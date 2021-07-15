import {Button} from 'react-bootstrap';
import {ModalButtonProps} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {cardgen_navigate, cardgen_showReport, cardgen_showCard} from '../../appData';
import {useEffect, useState} from 'react'
import useSound from 'use-sound';
import {Modal} from 'react-bootstrap'
import {appConfig} from '../../helpers';


const ModalButtons:React.FC<ModalButtonProps> = (props:ModalButtonProps) => {
    const {handleClose} = props;
    const dispatch = useAppDispatch();
    const {screen, enabled, rollComplete, showReport} = useAppSelector(state => state.cardGenData.uiState)
    const [confirmCancel, setConfirmCancel]  = useState(false);

    const [playOn, {stop}] = useSound(
        `${appConfig.audioRoot}/entertained.mp3`,
        { volume: .5 }
      );
     

      useEffect(() => {
        if(!confirmCancel) {
          stop();
        } else {
            playOn();
            setTimeout(() => {
                playOn();
            },50)
        }
      }, [confirmCancel, stop, playOn])
    




    const handleGetCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(cardgen_navigate('GENERATE'));   
    }



    const handleViewReport = () => {
        dispatch(cardgen_showReport());
    }

    const handleViewCard = () => {
        dispatch(cardgen_showCard())
    }

    const handleCloseClick = () => {
        setConfirmCancel(true);        
    }

    const handleCancel = () => {
        setConfirmCancel(false);
        handleClose()
    }

    const handleContinue = () => {
        setConfirmCancel(false);
    }


    return (
        <>
            {(enabled && screen==='PRELOAD') && <Button variant="btn btn-success" onClick={handleGetCard}>Get Your Card!</Button>}
            {(rollComplete && !showReport && screen==='GENERATE') && <Button variant="btn btn-success" onClick={handleViewReport}>Probability Report</Button>}
            {(rollComplete && showReport && screen==='GENERATE') && <Button variant="btn btn-success" onClick={handleViewCard}>View Card</Button>}
            {(rollComplete && screen==='GENERATE') && <Button variant="btn btn-secondary" onClick={handleCloseClick}>Close without saving</Button>}
            {(!rollComplete && screen==='GENERATE') && <Button variant="btn btn-secondary" onClick={handleCloseClick}>Cancel</Button>}
            {(!rollComplete && screen==='PRELOAD') && <Button variant="btn btn-secondary" onClick={handleCloseClick}>Cancel</Button>}
            {screen==='SPLASH' && <Button variant="btn btn-secondary" onClick={handleClose}>Cancel</Button>}

            <Modal 
                show={confirmCancel} 
                centered aria-labelledby="contained-modal-title-vcenter" 
                contentClassName={screen === 'PRELOAD' ? 'bg-light' :''} 
                onHide={handleCancel} 
                size="sm"
                animation={false}>
                <Modal.Body className={screen === 'PRELOAD' ? 'text-dark' :'text-light'} >Are you sure you want to cancel?? It's fuuuunnnn...</Modal.Body>
                <Modal.Footer>
                <Button variant="btn btn-warning btn-sm" onClick={handleCancel}>
                    Yes, Cancel
                </Button>
                <Button variant="btn btn-success btn-sm" onClick={handleContinue}>
                    No, Continue
                </Button>
                </Modal.Footer>
            </Modal>

        </>
        )
}

export default ModalButtons;