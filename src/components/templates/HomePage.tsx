import {Row, Col, Container} from 'react-bootstrap';
import {BingoLauncher} from '../UI';
//import {useAppSelector} from '../../hooks';

const HomePage:React.FC<any> = (props) => {
    //const user = useAppSelector(state => state.appData.uiState.user)
    const {ContentComponent, SidebarComponents, pageTitle, rootClass, ...rest} = props;
    // const {title, content} = useDynamicContent()



    return (
        <>
            <Container className="content home-page__bannercontainer my-0 px-0 py-0">
                <Row>
                    <Col xs={12}>
                        <div className="home-page__banner">
                            <BingoLauncher>
                                <img src="../dist/images/homebanner.jpg" alt="Trump World Indictment Bingo, the #1 game in America!" />
                            </BingoLauncher>
                        </div>
                    </Col>
                </Row>

 
            </Container>            
            <Container className="content mt-0">


                <Row>
                    <Col xs={12} sm={8} md={8} className={rootClass}>
                    <ContentComponent {...rest} />
                    </Col>
                    <Col xs={12} sm={4} md={4} className="right-sidebar d-none d-sm-block d-md-block">
                        {SidebarComponents && SidebarComponents.map((SidebarComponent:any) => {
                            return <SidebarComponent />
                        })}
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default HomePage;
