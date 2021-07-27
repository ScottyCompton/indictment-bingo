import {Header, Footer, LeaderBoard728X90} from '../../components/layout'
import {useDynamicContent} from '../../hooks';
import {Row, Col, Container} from 'react-bootstrap';
import {PageTitle} from '../UI'


const BasicWithTitle:React.FC<any> = (props) => {
    const {ContentComponent, pageTitle, rootClass, ...rest} = props;
    const {title, content} = useDynamicContent();
    const componentProps = {content:content, ...rest}
    return (
        <>
            <Header />
            <LeaderBoard728X90 />
            <Container className="content">
                <Row>
                    <Col xs={12}>
                        <PageTitle pageTitle={pageTitle ? pageTitle : (title ? title : ' ')} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={rootClass}>
                        <ContentComponent {...componentProps} />
                    </Col>
                </Row>
            </Container>
            <LeaderBoard728X90 />
            <Footer />
        </>

    )
}

export default BasicWithTitle;
