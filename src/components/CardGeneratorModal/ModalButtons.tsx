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
            {(enabled && screen==='PRELOAD') && <Button variant="btn btn-sm btn-success" onClick={handleGetCard}>Get Your Card!</Button>}
            {(rollComplete && !showReport && screen==='GENERATE') && <Button variant="btn btn-sm btn-warning" onClick={handleViewReport}>Probability Report</Button>}
            {(rollComplete && showReport && screen==='GENERATE') && <Button variant="btn btn-sm btn-warning" onClick={handleViewCard}>View Card</Button>}
            {(rollComplete && screen==='GENERATE') && <Button variant="btn btn-sm btn-secondary" onClick={handleCloseClick}>Close without saving</Button>}
            {(!rollComplete && screen==='GENERATE') && <Button variant="btn btn-sm btn-secondary" onClick={handleCloseClick}>Cancel</Button>}
            {(!rollComplete && screen==='PRELOAD') && <Button variant="btn btn-sm btn-secondary" onClick={handleCloseClick}>Cancel</Button>}
            {screen==='SPLASH' && <Button variant="btn btn-sm btn-secondary" onClick={handleClose}>Cancel</Button>}

            <Modal 
                show={confirmCancel} 
                centered aria-labelledby="contained-modal-title-vcenter" 
                contentClassName="bg-secondary"
                onHide={handleCancel} 
                size="sm"
                animation={false}>
                <Modal.Header>
                    <h6>Exit without saving?</h6>
                </Modal.Header>
                <Modal.Body >Are you sure you want to exit without saving?</Modal.Body>
                <Modal.Footer>
                <Button variant="btn btn-warning btn-sm" onClick={handleContinue}>
                    Continue
                </Button>
                <Button variant="btn btn-primary btn-sm" onClick={handleCancel}>
                    Exit without saving
                </Button>
                </Modal.Footer>
            </Modal>

        </>
        )
}

export default ModalButtons;