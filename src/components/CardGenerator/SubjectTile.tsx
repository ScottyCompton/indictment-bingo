import {SubjectTileProps} from '../../interfaces';
import {useState, useRef} from 'react';
import {useAppSelector} from '../../hooks';
//import {cardgen_updateCompletedTileCount} from '../../appData'
import TilePopover from './TilePopover';

const SubjectTile:React.FC<SubjectTileProps> = (props:SubjectTileProps) => {
    //const dispatch = useAppDispatch();
    const popoverContainerRef = useRef(null); 
    const imgRef = useRef(null);
    const [showPopover, setShowPopover] = useState(false);
    const rollComplete = useAppSelector(state => state.cardGenData.uiState.rollComplete);


    // const [subjectData, setSubjectData] = useState<Subject>({
    //     _id: '-1',
    //     subjectTitle: null, 
    //     subjectDesc: null,
    //     subjectShortDesc: null,
    //     subjectImg: `roller${rollerImgId}.gif`,
    //     markDate: null,
    //     imgClass: 'subject_tile-img subject_tile-img__rolling',
    //     nohover: false
    // })
    
    const {subject, idx} = props;
    const { markDate, subjectTitle, subjectImg, nohover} = subject;

    let imgClass = 'subject_tile-img';
    imgClass = (markDate && markDate != null) ? imgClass +  ' subject_tile-img__active' : imgClass;
    imgClass = !nohover ? imgClass + ' subject_tile-img__enabled' : imgClass;


    // const selectedSubjects = useAppSelector(state => state.cardGenData.selectedSubjects);
    // const subjects:Subject[] = useAppSelector(state => state.cardGenData.subjects);
    //const rollComplete:boolean = useAppSelector(state => state.cardGenData.uiState.rollComplete)

    // useEffect(() => {
    //     if(selectedSubjects.length !== 0) {
    //         let selectedSubject:Subject | undefined = subjects.find(item => item._id === selectedSubjects[idx]._id)

    //         if(selectedSubject) {
    //             const {_id, subjectTitle, subjectShortDesc, subjectDesc, markDate, subjectImg, probability, nohover} = selectedSubject;
                
    //             let imgClass = 'subject_tile-img';

    //             imgClass = (markDate && markDate != null) ? imgClass +  ' subject_tile-img__active' : imgClass;
    //             imgClass = !nohover ? imgClass + ' subject_tile-img__enabled' : imgClass;

    //             // setSubjectData({
    //             //     _id,
    //             //     subjectTitle,
    //             //     subjectShortDesc,
    //             //     subjectDesc,
    //             //     subjectImg,
    //             //     markDate,
    //             //     nohover,
    //             //     probability,
    //             //     imgClass
    //             // })
    //             //dispatch(cardgen_updateCompletedTileCount());
    //         }
    //     }        
    // }, [dispatch, subjects,idx, selectedSubjects])




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
            {!nohover && <TilePopover data={subject} idx={idx} show={showPopover && rollComplete} containerRef={popoverContainerRef.current} target={imgRef.current} />}
           <img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick} ref={imgRef} alt={subjectTitle + ''} src={`../dist/images/subjects/${subjectImg}`} className={imgClass} />
        </div>
    );
}

export default SubjectTile;