import {Row, Col, Container} from 'react-bootstrap';
import {PageTitle} from '../UI'
import {useDbContent, useScrollTo} from '../../hooks'



const BasicWithTitle:React.FC<any> = (props) => {
    const {ContentComponent, pageTitle, rootClass, ...rest} = props;
    useScrollTo(0,0);

    const dbContent = useDbContent();
    
    const componentProps = {
        dbContent,
        ...rest
    }

    return (
        <>
            <Container className="content">
                <Row>
                    <Col xs={12}>
                        <PageTitle pageTitle={pageTitle ? pageTitle : (dbContent.title ? dbContent.title : ' ')} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={rootClass}>
                        <ContentComponent {...componentProps} />
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default BasicWithTitle;
