
import {useAppSelector,} from '../hooks';
import {SavedCardData, UserCardListProps} from '../interfaces'
import {UserCard} from './'
import {v4 as uuid} from 'uuid';



const UserCardList:React.FC<UserCardListProps> = (props:UserCardListProps) => {
    const {savedCards} = useAppSelector(state => state.cardData);


    return (
        <>
        <div className="usercardlist fade-in">
            <div className="usercardlist__wrapper">
                {savedCards && savedCards?.map((cardData:SavedCardData) => {
                    return (
                        <UserCard key={uuid()} cardData={cardData} />
                    )
                })}
            </div>
        </div>

        
        </>

    )
}

export default UserCardList;