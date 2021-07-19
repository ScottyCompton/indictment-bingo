import {useEffect, useState} from 'react';
import {useAppSelector,} from '../hooks';
import {SavedCardData, UserCardListProps} from '../interfaces'
import {UserCard} from './'
import {Modal, Button} from 'react-bootstrap';
import {v4 as uuid} from 'uuid';
import {card_deleteCard} from '../appData';
import {useAppDispatch} from '../hooks'


const UserCardList:React.FC<UserCardListProps> = (props:UserCardListProps) => {
    const {savedCards} = useAppSelector(state => state.cardData);
    const [cardList, setCardList] = useState(savedCards);
    const [showModal, setShowModal] = useState(false);
    const [cardId, setCardId] = useState(null);

    const dispatch = useAppDispatch();
    useEffect(() => {
        setCardList(savedCards)
    }, [savedCards])


    const handleTileClick = (cardId:string) => {
        if(cardId) {
            props.handleTileClick(cardId)
        }
    }


    const handleConfirmDelete = (cardId:any) => {
        // triggers the modal window 
        setCardId(cardId)
        setShowModal(true);
    }

    const handleCancel = () => {
        // closes the modal window
        setCardId(null)
        setShowModal(false);

    }

    const handleDelete = () => {
        // does the killin'
        dispatch(card_deleteCard(cardId));
        setShowModal(false);
    }


    return (
        <>
        <div className="usercardlist">
            <div className="usercardlist__wrapper">
                {cardList && cardList?.map((cardData:SavedCardData) => {
                    return (
                        <UserCard key={uuid()} handleConfirmDelete={handleConfirmDelete} cardData={cardData} handleTileClick={handleTileClick} />
                    )
                })}
            </div>
        </div>

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

export default UserCardList;