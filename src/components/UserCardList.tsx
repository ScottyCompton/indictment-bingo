import {useEffect, useState} from 'react';
import {useAppSelector,} from '../hooks';
import {SavedCardData, UserCardListProps} from '../interfaces'
import {UserCard} from './'
import {v4 as uuid} from 'uuid';


const UserCardList:React.FC<UserCardListProps> = (props:UserCardListProps) => {
    const {savedCards} = useAppSelector(state => state.cardData);
    const [cardList, setCardList] = useState(savedCards);


    useEffect(() => {
        setCardList(savedCards)
    }, [savedCards])


    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const cardId = target!.parentElement!.getAttribute('id');        
        if(cardId) {
            props.handleClick(cardId)
        }
    }


    return (
        <div className="usercardlist">
            <div className="usercardlist__wrapper">
                {cardList && cardList?.map((cardData:SavedCardData) => {
                    return (
                        <UserCard key={uuid()} cardData={cardData} handleClick={handleClick} />
                    )
                })}
            </div>
        </div>

    )
}

export default UserCardList;