import {useState} from 'react';
import { withRouter } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {cardgen_reeinitialize, cardgen_killmusic, cardgen_disableRoll} from '../appData';
import {useAppDispatch} from '../hooks'
import {CardGeneratorModal} from '../components';


const Cards:React.FC = () => {
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




    return (
       <div>
            <Button onClick={handleShowGenerator} className="btn btn-success">Generate Card</Button>
            <CardGeneratorModal handleClose={handleClose} showGenerator={showGenerator} />       
        </div>
    )
}


export default withRouter(Cards);