import {UserCardProps} from '../interfaces/';
import {appConfig} from '../helpers';
import {Col, Row, Container} from 'react-bootstrap'


const UserCard:React.FC<UserCardProps> = (props:UserCardProps) => {
    const {_id, cardThumbImg, cardName} = props.cardData;
    const {handleClick} = props;

    return (
        <Container fluid className="usercardlist__card">
            <Row>
                <Col xs={4} sm={3}>
                <a href="#tile" id={_id} onClick={handleClick}><img src={appConfig.apiRoot + '/' + cardThumbImg} alt={cardName} /></a>
                </Col>
                <Col xs={8} sm={9}>

                </Col>
            </Row>
            
        </Container>
                )
}

export default UserCard;