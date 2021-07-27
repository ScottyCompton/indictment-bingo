import {Header, Footer, LeaderBoard728X90} from '../../components/layout'
import {Row, Col, Container} from 'react-bootstrap';
import {PageTitle} from '../UI'
import {useDynamicContent} from '../../hooks';


const ContentWithRightSideBar:React.FC<any> = (props) => {

    const {ContentComponent, pageTitle, rootClass, ...rest} = props;
    const {title, content} = useDynamicContent()



    return (
        <div className="page fade-in">
            <Header />
            <LeaderBoard728X90 />
            <Container className="content">
                <Row>
                    <Col xs={12}>
                        <PageTitle pageTitle={pageTitle ? pageTitle : (title ? title : 'Some New Page')} />
                    </Col>
                </Row>
                {content && <>
                <Row>
                    <Col xs={12}>{content}</Col>
                </Row>
                <Row><Col xs={12}><p>&nbsp;</p></Col></Row>
                    </>
                }

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

export default ContentWithRightSideBar;
