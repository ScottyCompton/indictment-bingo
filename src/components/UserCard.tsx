import {UserCardProps} from '../interfaces/';
import {useState} from 'react';
import {Col, Row, Container} from 'react-bootstrap'
import {Modal, Button} from 'react-bootstrap';
import {card_deleteCard, cardgen_showGenerator, cardgen_donloadOnly} from '../appData';
import {useAppDispatch} from '../hooks'
import {appConfig} from '../helpers';

const UserCard:React.FC<UserCardProps> = (props:UserCardProps) => {
    const {_id, cardThumbImg, cardName, createdAt, downloadCount} = props.cardData;
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch()
    const downloadLimit = appConfig.cardDownloadLimit;
  

    const handleConfirmDelete = (cardId:any) => {

        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);

    }

    const handleDelete = () => {
        // does the killin'
        dispatch(card_deleteCard(_id));
        setShowModal(false);
    }

    const fmtDate = (dateStr:string) => {
        const dte = new Date(dateStr);
        const strOut = dte.getMonth() + '/' + dte.getDate() + '/' + dte.getFullYear()
        return strOut;
    }


    const handleView = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(cardgen_showGenerator(true, _id))
    }

    const handleDownload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(_id) {
            dispatch(cardgen_donloadOnly(_id))
        }
    }

    const handleRefresh = () => {
        console.log('theoretical refresh...')
    }


    return (
        <>
        <Container fluid className="usercardlist__card fade-in">
            <Row>
                <Col xs={6}>
                    Created On:
                </Col>
                <Col className="text-right">{fmtDate(createdAt)}</Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="usercardlist__imgcontainer">
                        <img src={cardThumbImg} alt={cardName} />
                    </div>
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
                    <button onClick={handleConfirmDelete} className="form-control btn btn-link btn-sm">Delete</button>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    {downloadCount < downloadLimit &&
                        <button onClick={handleDownload} className="form-control btn btn-primary">Download ({downloadLimit - downloadCount} remaining)</button>                
                    }
                    {downloadCount >= downloadLimit &&
                        <button className="form-control btn btn-primary" disabled>Download (0 remaining)</button>                
                    }
                </Col>
            </Row>
            
        </Container>

        <Modal 
        show={showModal} 
        centered aria-labelledby="contained-modal-title-vcenter" 
        contentClassName="bg-secondary"
        onHide={handleCancel} 
        size="sm"
        animation={true}>
        <Modal.Header>
            <h6>Delete Card?</h6>
        </Modal.Header>
        <Modal.Body >Are you sure you want to delete this card?</Modal.Body>
        <Modal.Footer>
        <Button variant="btn btn-warning btn-sm" onClick={handleDelete}>
            Delete Card
        </Button>
        <Button variant="btn btn-primary btn-sm" onClick={handleCancel}>
            Cancel
        </Button>
        </Modal.Footer>
        </Modal>
        </>
    )
}

export default UserCard;