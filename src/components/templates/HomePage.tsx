import {Header, Footer, LeaderBoard728X90} from '../../components/layout'
import {Row, Col, Container} from 'react-bootstrap';
// import {PageTitle} from '../UI'
// import {useDynamicContent} from '../../hooks';
import {BingoLauncher} from '../UI';

const HomePage:React.FC<any> = (props) => {

    const {ContentComponent, pageTitle, rootClass, ...rest} = props;
    // const {title, content} = useDynamicContent()



    return (
        <div className="page fade-in">
            <Header />
            <LeaderBoard728X90 />
            <Container className="content">
                <Row>
                    <Col xs={12}>
                        <div className="home-page__banner">
                            <BingoLauncher>
                                <img src="../dist/images/homebanner.jpg" alt="Trump World Indictment Bingo, the #1 game in America!" />
                            </BingoLauncher>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={8} md={8} className={rootClass}>
                    <ContentComponent {...rest} />
                    </Col>
                    <Col xs={12} sm={4} md={4} className="right-sidebar d-none d-sm-block d-md-block">
                        RIGHT CONTENT GOES HERE
                    </Col>
                </Row>
            </Container>
            <LeaderBoard728X90 />
            <Footer />
        </div>

    )
}

export default HomePage;
