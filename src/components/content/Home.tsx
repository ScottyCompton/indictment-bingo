import {Row, Col, Container, Button} from 'react-bootstrap';
import {HomeCard} from './'
import homeCardData from '../../fixtures/homeCards.json'
import {BingoLauncher} from '../UI';
import {v4 as uuid} from 'uuid';
import {useAppSelector, useDbContent} from '../../hooks';


const Home:React.FC = () => {
    const arrCards = homeCardData.homeCards;
    const user = useAppSelector(state => state.appData.uiState.user);

    const dbContent = useDbContent('home');


    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <h5 style={{paddingBottom: '20px'}}>{dbContent.isLoaded && dbContent.title}</h5>
                    {dbContent.isLoaded && <div dangerouslySetInnerHTML={{ __html: dbContent.content +'' }} ></div>}
                    
                </Col>
            </Row>
            <Row><Col><p>&nbsp;</p></Col></Row>
            <Row className="d-block d-sm-none d-md-none d-lg-none">
                <Col xs={12}>
                    <BingoLauncher>
                        <img src="../dist/images/tomi-bingo-xs.png" style={{width: '110%'}} title="Click me, big boy..." alt="Tomi Loves Indictment Bingo!"/>
                    </BingoLauncher> 
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                {user && <BingoLauncher><Button type="button" className="btn btn-lg big-button form-control btn-warning">CREATE A NEW BINGO CARD NOW</Button></BingoLauncher>}
                {!user && <BingoLauncher><Button type="button" className="btn btn-lg big-button form-control btn-warning">LOGIN AND PLAY NOW</Button></BingoLauncher>}

                    
                                    
                </Col>
            </Row>
            <Row className="d-none d-sm-block d-md-block"><Col><p>&nbsp;</p></Col></Row>
            <Row>
                <Col xs={12}>
                        <h5 className="d-none d-sm-block d-md-block">About Indictment Bingo</h5>
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