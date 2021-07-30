import {Link} from 'react-router-dom';
import {useState} from 'react';

export interface HomeCardProps {
    data: {
        cardTitle: string;
        cardImg: string;
        desc: string;
        linkUrl: string;
    }
}

const HomeCard:React.FC<HomeCardProps> = (props:HomeCardProps) => {
    const {cardTitle, cardImg, desc, linkUrl} = props.data;
    const [rootClass, setRootClass] = useState('home-card-list__img')


    const handleMouseOver = () => {
        setRootClass('home-card-list__img inverted');
    }

    const handleMouseOut = () => {
        setRootClass('home-card-list__img');
    }



    return (
        <div className="home-card-list__card" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <div className="home-card-list__img-container">
                <Link  to={linkUrl}><img src={cardImg} alt={cardTitle} className={rootClass} /></Link>
                </div>
                <div className="home-card-list__details">
                    <h6 className="text-center">{cardTitle}</h6>
                    <div className="home-card-list__desc text-center">{desc}</div>
                </div>
    </div>
    )
}

export default HomeCard;