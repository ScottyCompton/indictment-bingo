import { withRouter, useHistory } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {cardgen_reeinitialize, cardgen_showGenerator, cardgen_killmusic, cardgen_disableRoll} from '../appData';
import {useAppDispatch, useAppSelector} from '../hooks'
import {CardGeneratorModal, UserCardList, PageTitle} from '../components';
import {Container, Row, Col} from 'react-bootstrap';




const Cards:React.FC = () => {
    const dispatch = useAppDispatch();
    const cardsRemaining = useAppSelector(state => state.appData.uiState.user?.cardsRemaining);
    const history = useHistory();



    const handleShowGenerator = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();


        if(cardsRemaining === 0) {
            history.push('/paywall')
        } else {
            dispatch(cardgen_showGenerator(true))
        }
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


    return (
        <>
     
       <Container fluid className="cards fade-in px-0">
            <Row>
                <Col xs={12}>
                    <PageTitle pageTitle="Your Bingo Cards" />
                </Col>
            </Row>
            <Row>
               <Col xs={12}>
                    <UserCardList handleTileClick={handleTileClick} />
               </Col>
           </Row>
           <Row>
               <Col xs={12}>
                    <p>&nbsp;</p>
               </Col>
           </Row>
           <Row>
               <Col xs={12} className="text-center">
                    <div className="d-grid gap-2">
                            <Button type="button" onClick={handleShowGenerator} className="btn big-button btn-lg btn-warning">CLICK HERE TO GENERATE A NEW CARD</Button>
                    </div>
               </Col>
           </Row>
       </Container>

        <CardGeneratorModal handleClose={handleClose} />       
        </>
    )
}


export default withRouter(Cards);