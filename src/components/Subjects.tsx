import {useState, useEffect, useCallback} from 'react';
import SubjectTile from './SubjectTile';
import {v4 as uuid} from 'uuid';
import {Subject} from '../interfaces';
import PlayAgainButton from './PlayAgainButton'
import {useAppDispatch, useAppSelector} from '../hooks';
import {app_updateSelected} from '../appData';



const Subjects:React.FC = () => {
    const [aryTiles, setTileData] = useState<Subject[]>([]);
    const [rootClass, setRootClass] = useState('subjects fadeable fade-out');
    const dispatch = useAppDispatch();
    const subjects = useAppSelector(state => state.appData.subjects);
    
    const loadTiles = useCallback(() => {
        setRootClass('subjects fadeable fade-in');

        let currIdx = 0;
        let nextIdx = 0;

        let aryOut:any[] = [];
        for(let i = 0; i < subjects.length; i++) {
            while (nextIdx === currIdx) {
                nextIdx = Math.floor(Math.random() * 6)+1;
            }
            aryOut.push({subjectId: "-1", rollerImgId: nextIdx})
            currIdx = nextIdx;
        }


        setTileData(aryOut);
    },[subjects])





    const execRoll = useCallback(() => {
        let selectedIndex = -1;
        const arySelected:any[] = [];

        setTimeout(() => {
            setTimeout(() => {

                while((arySelected.length < subjects.length)) {
                    selectedIndex = Math.floor(Math.random() * subjects.length);
                    let nextSubject = subjects[selectedIndex];      // pull a random subject out of the subjects array
                    
                    if (arySelected.findIndex(item =>  item.subjectId === nextSubject.subjectId) === -1) {
                        arySelected.push(nextSubject);
                    }
                }
                dispatch(app_updateSelected(arySelected))   // here we have an arra of subjectId's                        
            }, 750)
        }, 500)        
    }, [dispatch, subjects])



    useEffect(() => {
            loadTiles();    
            execRoll();
    }, [loadTiles, execRoll])

  

    // const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault();
    //     setRootClass('subjects fadeable fade-out');                
    //     dispatch(app_reeinitialize());
    // }

    const handleClick = () => {
        setRootClass('subjects fadeable fade-out');                
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
                        {aryTiles && aryTiles.map((item: Subject, idx:number) => {
                            return <SubjectTile key={uuid()} idx={idx}  rollerImgId={item.rollerImgId} />
                        
                        })}
                    </div>
                </div>
            </div>
            <div>
            <PlayAgainButton handleClick={handleClick} />
        </div>
        </div>
                
    )
}

export default Subjects;



