import { withRouter } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {cardgen_showGenerator} from '../../appData';
import {useAppDispatch} from '../../hooks'
import {UserCardList} from '../';
import {Container, Row, Col} from 'react-bootstrap';
import {BingoLauncher} from '../UI';

const Cards:React.FC = () => {
    const dispatch = useAppDispatch();

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
               <Col xs={12} className="text-center">
                    <div className="d-grid gap-2">
                        <BingoLauncher>
                            <Button type="button" className="btn btn-lg big-button btn-warning">GENERATE BINGO CARD</Button>
                        </BingoLauncher>
                    </div>
               </Col>
           </Row>
           <Row>
               <Col xs={12}>
                    <p>&nbsp;</p>
               </Col>
           </Row>           
       </Container>

               
        </>
    )
}


export default withRouter(Cards);