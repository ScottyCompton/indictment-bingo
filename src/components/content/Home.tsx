import {Row, Col, Container, Button} from 'react-bootstrap';
import {HomeCard} from './'
import homeCardData from '../../fixtures/homeCards.json'
import {BingoLauncher} from '../UI';
import {v4 as uuid} from 'uuid';
import {useAppSelector} from '../../hooks';

const Home:React.FC = () => {
    const arrCards = homeCardData.homeCards;
    const user = useAppSelector(state => state.appData.uiState.user);

    return (
        <Container>
            <Row>
                <Col xs={12}><h1 className="special">When They Lose You Win!</h1>
                    It's indictment season in Trump World and it's only a matter of time until your favorite morally-degenrate MAGAt gets a visit from the FBI.  But why should they have all the fun?  Now, you can play along with the rest of the country as they're perp-walked to the court house when you play <strong className="superstrong">Trump World Indictment Bingo!</strong>.
                </Col>
            </Row>
            <Row><Col><p>&nbsp;</p></Col></Row>
            <Row>
                <Col xs={12}>
                {user && <BingoLauncher><Button type="button" className="btn btn-lg big-button form-control btn-success">CREATE A NEW BINGO CARD NOW</Button></BingoLauncher>}
                {!user && <BingoLauncher><Button type="button" className="btn btn-lg big-button form-control btn-success">LOGIN AND PLAY NOW</Button></BingoLauncher>}

                    
                                    
                </Col>
            </Row>
            <Row><Col><p>&nbsp;</p></Col></Row>
            <Row>
                <Col xs={12}>
                        <h5>About Indictment Bingo</h5>
                        <div className="home-card-list__container">
                            <div className="home-card-list">
                                {arrCards && arrCards.map((card) => {
                                    return <HomeCard key={uuid()} data={card} />
                                })}
                            </div>
                        </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home