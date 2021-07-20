import {useEffect} from 'react';
import { withRouter } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {cardgen_reeinitialize, cardgen_showGenerator, cardgen_killmusic, cardgen_disableRoll} from '../appData';
import {useAppDispatch} from '../hooks'
import {CardGeneratorModal, UserCardList} from '../components';
import {Container, Row, Col} from 'react-bootstrap';


const Cards:React.FC = () => {
    const dispatch = useAppDispatch();

    const handleShowGenerator = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(cardgen_showGenerator(true))
    }

    const handleClose = () => {
        dispatch(cardgen_showGenerator(false))
        dispatch(cardgen_killmusic());
        dispatch(cardgen_disableRoll());
        setTimeout(() => {
            dispatch(cardgen_reeinitialize())
        }, 500)        
    }

    const handleTileClick = (cardId:any) => {
        dispatch(cardgen_showGenerator(true, cardId))
    }

    useEffect(() => {
        console.log('cards page reloaded')
    })


    return (
        <>
       <Container fluid>
           <Row>
               <Col xs={12} className="text-center mb-3 mt-3">
                    <div className="d-grid gap-2">
                            <Button type="button" onClick={handleShowGenerator} className="btn big-button btn-lg btn-success">CLICK HERE TO GENERATE A NEW CARD</Button>
                        </div>
               </Col>
           </Row>
           <Row>
               <Col xs={12}>
                    <UserCardList handleTileClick={handleTileClick} />
               </Col>
           </Row>
       </Container>

        <CardGeneratorModal handleClose={handleClose} />       
        </>
    )
}


export default withRouter(Cards);