import {SubjectTileProps} from '../interfaces';
import {useState, useRef} from 'react';
import {useAppSelector} from '../hooks';
import TilePopover from './TilePopover';
import {appConfig} from '../helpers'

const SubjectTile:React.FC<SubjectTileProps> = (props:SubjectTileProps) => {
    const popoverContainerRef = useRef(null); 
    const imgRef = useRef(null);
    const [showPopover, setShowPopover] = useState(false);
    const rollComplete:any = useAppSelector(state => state.cardGenData.uiState.rollComplete);
    const cardId = useAppSelector(state => state.cardGenData.uiState.cardId)

    const {subject, idx} = props;
    const { markDate, subjectTitle, subjectImg, nohover} = subject;
    let imgClass = 'subject_tile-img';
    imgClass = (markDate && markDate != null) ? imgClass +  ' subject_tile-img__active' : imgClass;
    imgClass = !nohover ? imgClass + ' subject_tile-img__enabled' : imgClass;


    const handleMouseOver = () => {
        setShowPopover(true);
    }
    const handleMouseOut = () => {
        setShowPopover(false);
    }

    const handleClick = () => {
        if(nohover) return false;
        if(window.innerWidth < 500) {
            setShowPopover(!showPopover)
        } else {
            setShowPopover(false);
        }
    }

    return (
        <div className="subject_tile" ref={popoverContainerRef}>
            {(!nohover && (rollComplete || cardId)) && <TilePopover data={subject} idx={idx} show={showPopover} containerRef={popoverContainerRef.current} target={imgRef.current} />}
           <img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick} ref={imgRef} alt={subjectTitle + ''} src={appConfig.subjImgRoot + '/' + subjectImg} className={imgClass} />
        </div>
    );
}

export default SubjectTile;