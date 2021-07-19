import {UserCardProps} from '../interfaces/';
import {appConfig} from '../helpers';
import {Col, Row, Container} from 'react-bootstrap'
// import {ImageWithPreloader} from './'            // not ready for prime-time

const UserCard:React.FC<UserCardProps> = (props:UserCardProps) => {
    const {_id, cardThumbImg, cardName, createdAt} = props.cardData;


    const fmtDate = (dateStr:string) => {
        const dte = new Date(dateStr);
        const strOut = dte.getMonth() + '/' + dte.getDate() + '/' + dte.getFullYear()
        return strOut;
    }


    const handleView = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.handleTileClick(_id);
    }

    const handleRefresh = () => {
        alert('moo')
    }

    const handleDelete = () => {
        props.handleConfirmDelete(_id)
    }

    return (
        <Container fluid className="usercardlist__card">
            <Row>
                <Col xs={6}>
                    Created On:
                </Col>
                <Col className="text-right">{fmtDate(createdAt)}</Col>
            </Row>
            <Row>
                <Col xs={12}>
                <a href="#tile" onClick={handleView}><img src={appConfig.apiRoot + '/' + cardThumbImg} alt={cardName} /></a>
                {/* <a href="#tile" onClick={handleView}>
                    <ImageWithPreloader src={appConfig.apiRoot + '/' + cardThumbImg} />
                </a> */}
                </Col>
            </Row>
            <Row>
                <Col xs={4} className="mx-0">
                    <button onClick={handleView} className="form-control btn btn-link btn-sm">View</button>
                </Col>
                <Col xs={4} className="mx-0">
                    <button onClick={handleRefresh} className="form-control btn btn-link btn-sm">Refresh</button>
                </Col>
                <Col xs={4} className="mx-0">
                    <button onClick={handleDelete} className="form-control btn btn-link btn-sm">Delete</button>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>

                    <button className="form-control btn btn-primary">Download</button>
                </Col>
            </Row>
            
        </Container>
                )
}

export default UserCard;