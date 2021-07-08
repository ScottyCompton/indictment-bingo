import {SubjectTileProps, Subject} from '../interfaces';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../hooks';
import {app_updateCompletedTileCount} from '../appData'

const SubjectTile:React.FC<SubjectTileProps> = (props:SubjectTileProps) => {
    const dispatch = useAppDispatch();
    const {idx, rollerImgId} = props;

    const [subjectData, setSubjectData] = useState<Subject>({
        subjectId: '-1',
        subjectTitle: null, 
        subjectDesc: null,
        subjectImg: `roller${rollerImgId}.gif`,
        bingoDate: null,
        imgClass: 'subject_tile-img subject_tile-img__rolling'
    })
    
    const selectedSubjects = useAppSelector(state => state.appData.selectedSubjects);
    const subjects = useAppSelector(state => state.appData.subjects);





    useEffect(() => {

        if(selectedSubjects.length !== 0) {
            setTimeout(() => {

                let selectedSubject:Subject | undefined = subjects.find(item => item.subjectId === selectedSubjects[idx].subjectId)
    
                if(selectedSubject) {
                    const {subjectId, subjectTitle, subjectDesc, bingoDate, subjectImg} = selectedSubject;
    
                    setSubjectData({
                        subjectId,
                        subjectTitle,
                        subjectDesc,
                        subjectImg,
                        bingoDate,
                        imgClass: bingoDate !== null ? 'subject_tile-img subject_tile-img__active' : 'subject_tile-img subject_tile-img'
                    })
                    dispatch(app_updateCompletedTileCount());
                }
    
            }, Math.floor(Math.random() * 15000))

        }


    }, [idx, selectedSubjects, subjects, dispatch])


    return (
        <div className="subject_tile">
            <img alt={subjectData.subjectTitle + ''} src={`../dist/images/subjects/${subjectData.subjectImg}`} className={subjectData.imgClass} />
        </div>
    );
}

export default SubjectTile;