import {Button} from 'react-bootstrap';
import {ModalButtonProps} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {cardgen_navigate, cardgen_showReport, cardgen_showCard} from '../../appData';
import {useEffect, useState} from 'react'
import useSound from 'use-sound';
import {Modal} from 'react-bootstrap'
import {appConfig} from '../../helpers';


const ModalButtons:React.FC<ModalButtonProps> = (props:ModalButtonProps) => {
    const {handleClose, cardId} = props;
    const dispatch = useAppDispatch();
    const {screen, enabled, rollComplete, showReport} = useAppSelector(state => state.cardGenData.uiState)
    const [confirmCancel, setConfirmCancel]  = useState(false);

    const [playOn, {stop}] = useSound(
        `${appConfig.audioRoot}/entertained.mp3`,
        { volume: 1 }
      );
     

      useEffect(() => {
        if(!confirmCancel) {
          stop();
        } else {
            playOn();
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

            {!cardId && 
                <>
                    {(enabled && screen==='PRELOAD') && <Button variant="btn btn-sm btn-success" onClick={handleGetCard}>Get Your Card!</Button>}
                    {(rollComplete && !showReport && screen==='GENERATE') && <Button variant="btn btn-sm btn-warning text-primary" onClick={handleViewReport}>So Much Winning!</Button>}
                    {(rollComplete && showReport && screen==='GENERATE') && <Button variant="btn btn-sm btn-warning text-primary" onClick={handleViewCard}>View Card</Button>}
                    {(rollComplete && screen==='GENERATE') && <Button variant="btn btn-sm btn-primary" onClick={handleCloseClick}>Close without saving</Button>}
                    {(!rollComplete && screen==='GENERATE') && <Button variant="btn btn-sm btn-primary" onClick={handleCloseClick}>Cancel</Button>}
                    {(!rollComplete && screen==='PRELOAD') && <Button variant="btn btn-sm btn-primary" onClick={handleCloseClick}>Cancel</Button>}

                    <Modal 
                        show={confirmCancel} 
                        centered aria-labelledby="contained-modal-title-vcenter" 
                        contentClassName="bg-lignt round-corners confirm-modal"
                        onHide={handleCancel} 
                        size="sm"
                        animation={true}>
                        <Modal.Header>
                            <h6>Exit without saving?</h6>
                        </Modal.Header>
                        <Modal.Body className="text-primary text-center">Are you sure you want to exit without saving?</Modal.Body>
                        <Modal.Footer>
                        <Button variant="btn btn-success btn-sm text-primary" onClick={handleContinue}>
                            Continue
                        </Button>
                        <Button variant="btn btn-light btn-sm" onClick={handleCancel}>
                            Exit without saving
                        </Button>
                        </Modal.Footer>
                    </Modal>

                </>
            }
            {cardId && 
                <>
                    {!showReport && <Button variant="btn btn-sm btn-warning text-primary" onClick={handleViewReport}>So Much Winning!</Button>}
                    {showReport && <Button variant="btn btn-sm btn-warning text-primary" onClick={handleViewCard}>View Card</Button>}
                    <Button variant="btn btn-sm btn-secondary" onClick={handleClose}>Close</Button>
                </>
            }
        </>
        )
}

export default ModalButtons;