import {Container, Row, Col} from 'react-bootstrap'
const NotFound:React.FC = () => {
    return (
        <Container className="notfound">
            <Row>
                <Col xs={12}>
                    <div className="notfound__message">
                        <img src="../dist/images/404.jpg" alt="" />
                        <p>&nbsp;</p><p>Sorry - nothing here but a bunch of criminal scumbags on their way to jail.</p>
                    </div></Col>
            </Row>
        </Container>
    )
}

export default NotFound;