import {useAppSelector, useAppDispatch} from '../hooks'
import {useEffect, useState} from 'react';
import { useHistory, withRouter } from "react-router-dom";
import {CardGenerator} from '../components'
import {Modal, Button} from 'react-bootstrap';
import {cardgen_reeinitialize, cardgen_killmusic, cardGen_killTimers, cardgen_disableRoll} from '../appData';


const Cards:React.FC = () => {
    const user = useAppSelector(state => state.appData.uiState.user)
    const isLoading = useAppSelector(state => state.appData.uiState.isLoading);
    const history = useHistory();
    const [showGenerator, setShowGenerator] = useState(false);
    const dispatch = useAppDispatch()

useEffect(() => {
    if(!isLoading) {
        if(!user) {
            history.push('/login');
        }    
    }
}, [user, history, isLoading])


    const handleClose = () => {
        dispatch(cardGen_killTimers());
        dispatch(cardgen_killmusic());
        dispatch(cardgen_disableRoll());
        setShowGenerator(false);
        setTimeout(() => {
            dispatch(cardgen_reeinitialize())
        }, 500)
    }

    const handleShowGenerator = () => {
        setShowGenerator(true);
    }

    const generator = (
        <Modal centered aria-labelledby="contained-modal-title-vcenter" show={showGenerator} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Let's Play Indictement Bingo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CardGenerator />
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )



    return (
       <div>
           <Button onClick={handleShowGenerator} className="btn btn-success">Generate Card</Button>
        {generator}
       </div>
    )
}


export default withRouter(Cards);