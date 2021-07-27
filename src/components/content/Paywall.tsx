import {PageTitle} from '../UI';
import {Container, Row, Col} from 'react-bootstrap'

const Paywall:React.FC = () => {
    return (
        <Container className="fade-in" fluid>
            <Row>
                <Col xs={12}><PageTitle pageTitle="Help Keep Us Going" /></Col>
            </Row>
        </Container>

    )



}

export default Paywall;