import {useState, useEffect, useCallback} from 'react';
import subjectData from '../fixtures/subjectData.json';
import SubjectTile from '../components/SubjectTile';
import {v4 as uuid} from 'uuid';
import {SubjectScreenProps} from '../interfaces';
import PlayAgainButton from '../components/PlayAgainButton'


const Subjects:React.FC<SubjectScreenProps> = (props:SubjectScreenProps) => {
    const {subjects} = subjectData;
    const [arySubjects, setSubjectData] = useState(subjects);
    const [rootClass, setRootClass] = useState('subjects fadeable fade-out');
    const [btnVisible, setBtnVisible] = useState(false)
    const arrComplete: any = [];

    const loadTiles = useCallback(() => {
        let aryOut = arySubjects.slice();
        let currIdx = 0;
        let nextIdx = 0;
        arySubjects.forEach((item, idx) => {
            while (nextIdx === currIdx) {
                nextIdx = Math.floor(Math.random() * 6)+1;
            }
            const rollerImg = `roller${nextIdx}.gif`
            aryOut.splice(idx, 1, {...arySubjects[idx], subjectImg: rollerImg})
            currIdx = nextIdx;
        })

        setSubjectData(aryOut);
    },[arySubjects])




    const incrementComplete = (subjectId:number) => {
        if(!arrComplete.includes(subjectId)) {
            arrComplete.push(subjectId);

            if(arrComplete.length === subjects.length) {
                setBtnVisible(true);
            }            
        }
        
    }



    const execRoll = () => {
            let selectedIndex = -1;
            const arySelected:any[] = [];

            while((arySelected.length < subjects.length)) {
                selectedIndex = Math.floor(Math.random() * subjects.length);
                let nextSubject = subjects[selectedIndex];      // pull a random subject out of the subjects array
                
                if (arySelected.findIndex(item =>  item.subjectId === nextSubject.subjectId) === -1) {
                    arySelected.push(nextSubject);
                }
            }
            setSubjectData(arySelected);
    }

    useEffect(() => {
            loadTiles();
            setTimeout(() => {
                setRootClass('subjects fadeable fade-in');
                setTimeout(() => {
                    execRoll();
                }, 750)
            }, 500)
    }, [])

  

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setRootClass('subjects fadeable fade-out');
        setTimeout(() => {
            props.onNav('STEP1');
        },750)    
    }


    return (
        <div className={rootClass}>
            <div className="card bg-light mb-3">
                <div className="card-body">
                    <div className="subjects_wrapper">
                        <div className="subjects_title">B</div>
                        <div className="subjects_title">I</div>
                        <div className="subjects_title">N</div>
                        <div className="subjects_title">G</div>
                        <div className="subjects_title">O</div>
                        {arySubjects && arySubjects.map((subject,idx) => {
                        return <SubjectTile key={uuid()} idx={idx} incrementCounter={incrementComplete}  subjectData={subject} />
                        })}
                    </div>
                </div>
            </div>
            <PlayAgainButton handleClick={handleClick} showButton={btnVisible} />
        </div>
                
    )
}

export default Subjects;



