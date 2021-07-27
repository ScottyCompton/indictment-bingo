import { withRouter, useHistory } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {cardgen_showGenerator} from '../../appData';
import {useAppDispatch, useAppSelector} from '../../hooks'
import {UserCardList} from '../';
import {Container, Row, Col} from 'react-bootstrap';
import {BingoLauncher} from '../UI';

const Cards:React.FC = () => {
    const dispatch = useAppDispatch();
    // const cardsRemaining = useAppSelector(state => state.appData.uiState.user?.cardsRemaining);
    // const history = useHistory();



    // const handleShowGenerator = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    //     e.preventDefault();


    //     if(cardsRemaining === 0) {
    //         history.push('/paywall')
    //     } else {
    //         dispatch(cardgen_showGenerator(true))
    //     }
    // }


    const handleTileClick = (cardId:any) => {
        dispatch(cardgen_showGenerator(true, cardId))
    }


    return (
        <>
     
       <Container fluid className="cards fade-in px-0">
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
                        <BingoLauncher>
                            <Button type="button" className="btn btn-lg btn-warning">CLICK HERE TO GENERATE A NEW CARD</Button>
                        </BingoLauncher>
                    </div>
               </Col>
           </Row>
       </Container>

               
        </>
    )
}


export default withRouter(Cards);