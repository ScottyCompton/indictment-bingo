import {Row, Col, Container, Button} from 'react-bootstrap';
import {HomeCard} from './'
import homeCardData from '../../fixtures/homeCards.json'
import {BingoLauncher} from '../UI';
import {v4 as uuid} from 'uuid';
import {useAppSelector} from '../../hooks';
import {useDbContent} from '../../hooks';

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
            <Row>
                <Col xs={12}>
                {user && <BingoLauncher><Button type="button" className="btn btn-lg big-button form-control btn-primary">CREATE A NEW BINGO CARD NOW</Button></BingoLauncher>}
                {!user && <BingoLauncher><Button type="button" className="btn btn-lg big-button form-control btn-primary">LOGIN AND PLAY NOW</Button></BingoLauncher>}

                    
                                    
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