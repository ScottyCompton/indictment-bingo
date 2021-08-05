import {faDownload, faShareAlt, faSyncAlt, faTrashAlt, faEye} from '@fortawesome/free-solid-svg-icons';
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {UserCardProps} from '../interfaces/';
import {useState, useEffect} from 'react';
import {Col, Row, Container} from 'react-bootstrap'
import {Modal, Button} from 'react-bootstrap';
import {cardgen_showGenerator, cardgen_downloadCard} from '../components/CardGenerator/appData';
import {card_deleteCard, app_setIsLoading} from '../appData';
import {useAppDispatch} from '../hooks'
import {appConfig} from '../helpers';
import UserCardButton from './UserCardButton';

const UserCard:React.FC<UserCardProps> = (props:UserCardProps) => {
    const {_id, cardThumbImg, cardName, downloadCount} = props.cardData;
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch()
    const downloadLimit = appConfig.cardDownloadLimit;
    const [winSize, setWinSize] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setWinSize(window.innerWidth);
        }

        // initiate the event handler
        window.addEventListener('resize', handleResize, false)
    
        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
          window.removeEventListener('resize', handleResize)
        }
      })



    const handleShare = (cardId:any) => {
        alert('Share to the world...')
    }

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

    const handleView = (e:any) => {
        if(e) {e.preventDefault();}
        dispatch(cardgen_showGenerator(true, _id))
        return false;
    }

    const handleDownload = () => {
        if(_id) {
            dispatch(app_setIsLoading({isLoading: true, loadingMsg: 'Retrieving your card'}))
            dispatch(cardgen_downloadCard(_id))
        }
    }

    const handleRefresh = () => {
        alert('Consider yoursel refreshed...')
    }

    const getIconProps = (icon:any) => {
        const size:SizeProp = winSize < 576 ? 'lg' : '1x';
        return ({
            icon,
            size:size
        })
    }


    return (
        <>
        <div className="card usercardlist__card">
            <div className="card-body">
                <Container fluid className=" px-3">
                
                <Row>
                    <Col xs={12} className="px-0">
                        <div className="usercardlist__imgcontainer">
                            <a href="#view" onClick={handleView}><img src={cardThumbImg} alt={cardName} /></a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3 py-2 bg-dark">            
                    <Col xs={1}></Col>
                    <Col xs={2}><UserCardButton disabled={downloadCount >= downloadLimit} altText="Download" iconProps={getIconProps(faDownload)} handleClick={handleDownload}/></Col>
                    <Col xs={2}><UserCardButton handleClick={handleView} altText="view Details" iconProps={getIconProps(faEye)} /></Col>
                    <Col xs={2}><UserCardButton handleClick={handleRefresh} altText="Refresh Card" iconProps={getIconProps(faSyncAlt)} /></Col>
                    <Col xs={2}><UserCardButton handleClick={handleConfirmDelete} altText="Delete Card" iconProps={getIconProps(faTrashAlt)} /></Col>
                    <Col xs={2}><UserCardButton handleClick={handleShare} altText="Share" iconProps={getIconProps(faShareAlt)}/></Col>
                    <Col xs={1}></Col>
                </Row>
                
                </Container>
            </div>
        </div>

 

        <Modal 
            show={showModal} 
            centered aria-labelledby="contained-modal-title-vcenter" 
            contentClassName="round-corners bg-secondary"
            onHide={handleCancel} 
            size="sm"
            animation={true}>
            <Modal.Header>
                <h6>Delete Card?</h6>
            </Modal.Header>
            <Modal.Body >Are you sure you want to delete this card?</Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-warning btn-sm text-primary" onClick={handleDelete}>
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