import {useEffect, useState} from 'react';
import { useHistory, withRouter } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {cardgen_reeinitialize, cardgen_killmusic, cardgen_disableRoll} from '../appData';
import {useAppSelector, useAppDispatch} from '../hooks'
import {CardGeneratorModal} from '../components';

const Cards:React.FC = () => {
    const user = useAppSelector(state => state.appData.uiState.user)
    const isLoading = useAppSelector(state => state.appData.uiState.isLoading);
    const history = useHistory();
    const [showGenerator, setShowGenerator] = useState(false);
    const dispatch = useAppDispatch();

    const handleShowGenerator = () => {
        setShowGenerator(true);
    }

    const handleClose = () => {
        setShowGenerator(false);
        dispatch(cardgen_killmusic());
        dispatch(cardgen_disableRoll());
        setTimeout(() => {
            dispatch(cardgen_reeinitialize())
        }, 500)        
    }


useEffect(() => {
    if(!isLoading) {
        if(!user) {
            history.push('/login');
        }    
    }
}, [user, history, isLoading])




    return (
       <div>
           <Button onClick={handleShowGenerator} className="btn btn-success">Generate Card</Button>
            <CardGeneratorModal handleClose={handleClose} showGenerator={showGenerator} />
       </div>
    )
}


export default withRouter(Cards);