import {SubjectTileProps} from '../interfaces';
import {useState, useEffect} from 'react';



const SubjectTile:React.FC<SubjectTileProps> = (props:SubjectTileProps) => {
    const {subjectId, subjectTitle, subjectImg, subjectDesc, bingoDate} = props.subjectData;
    const [imgToShow, setImgToShow] = useState('nothing.png');
    const [imgClass, setImgClass] = useState('subject_tile-img');
    useEffect(() => {
        if(subjectId !== -1) {
            setImgToShow(`roller${Math.floor(Math.random() * 6)+1}.gif`);
            setImgClass('subject_tile-img subject_tile-img__rolling')
            setTimeout(() => {
                setImgToShow(subjectImg);
                if(bingoDate !== null) {
                    setImgClass('subject_tile-img subject_tile-img__active')
                } else {
                    setImgClass('subject_tile-img');
                }
            }, Math.floor(Math.random() * 15000))
        } else {
            if(subjectImg.indexOf('roller') !== -1) {
                setImgToShow(subjectImg);
            }
        }
    }, [subjectImg, subjectId, bingoDate])


    return (
        <div className="subject_tile">
            <img alt={subjectTitle} src={`../dist/images/subjects/${imgToShow}`} className={imgClass} />
        </div>
    );
}

export default SubjectTile;