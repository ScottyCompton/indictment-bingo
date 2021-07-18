import {useState} from 'react';
import { withRouter } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {cardgen_reeinitialize, cardgen_killmusic, cardgen_disableRoll} from '../appData';
import {useAppDispatch} from '../hooks'
import {CardGeneratorModal, UserCardList} from '../components';
import {Container, Row, Col} from 'react-bootstrap';


const Cards:React.FC = () => {
    const [showGenerator, setShowGenerator] = useState(false);
    const [cardId, setCardId] = useState(undefined);

    const dispatch = useAppDispatch();

    const handleShowGenerator = () => {
        setCardId(undefined)
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

    const handleTileClick = (cardId:any) => {
        setCardId(cardId);
        setShowGenerator(true);
    }



    return (
        <>
       <Container fluid>
           <Row>
               <Col xs={12} className="text-center mb-3 mt-3">
                    <div className="d-grid gap-2">
                            <Button onClick={handleShowGenerator} className="btn big-button btn-lg btn-success">CLICK HERE TO GENERATE A NEW CARD</Button>
                        </div>
               </Col>
           </Row>
           <Row>
               <Col xs={12}>
                    <UserCardList handleClick={handleTileClick} />
               </Col>
           </Row>
       </Container>

        <CardGeneratorModal cardId={cardId} handleClose={handleClose} showGenerator={showGenerator} />       
        </>
    )
}


export default withRouter(Cards);