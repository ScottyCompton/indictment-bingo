import {useState, useEffect, useCallback, useMemo} from 'react';
import SubjectTile from './SubjectTile';
import {v4 as uuid} from 'uuid';
import {Subject, SelectedSubject} from '../../interfaces';
//import PlayAgainButton from './PlayAgainButton'
import {useAppDispatch, useAppSelector} from '../../hooks';
import {cardgen_updateSelected, cardgen_queuemusic, cardgen_enableRoll, cardgen_disableRoll, cardgen_updateCompletedTileCount} from '../../appData';
//import ProbabilitReport from './ProbabilityReport';
import {appConfig} from '../../helpers'


const BingoCard:React.FC = () => {
    const [rootClass, setRootClass] = useState('subjects fadeable fade-out');
    const dispatch = useAppDispatch();
    const subjects = useAppSelector(state => state.cardGenData.subjects);
    const selectedSubjects = useAppSelector(state => state.cardGenData.selectedSubjects);
    const enabled = useAppSelector(state => state.cardGenData.uiState.enabled);
    const [aryTiles, setArrayTiles] = useState<Subject[]>()

    



    const getSelectedSubjects = useCallback(() => {
        // create a new randomized array of Selected subjects from the existing subjects

        let selectedIndex = -1;
        const arySelected:SelectedSubject[] = [];
       
        while((arySelected.length < subjects.length)) {
            selectedIndex = Math.floor(Math.random() * subjects.length);
            let nextSubject = subjects[selectedIndex];      // pull a random subject out of the subjects array
            
            if (arySelected.findIndex(item =>  item._id === nextSubject._id) === -1) {
                arySelected.push({
                    _id: nextSubject._id,
                    probability: nextSubject.probability
                });
            }
        }
        dispatch(cardgen_updateSelected(arySelected))   // here we have an arra of subjectId's 

    }, [dispatch, subjects])


    const displayRandomSelectedSubject = useMemo(() => {
        // randomly display from the selected subjects array data from the subjects array
        // so that it appears the tiles are appearing at random intervals when displayed

        const arySelected:SelectedSubject[] = selectedSubjects.slice();
        const aryDisplayed:SelectedSubject[] = [];  // an array of tiles aready displayed 
        const interval = window.setInterval(() => {
            let found = false;

            while(!found) {
                const selectedIndex = Math.floor(Math.random() * arySelected.length);
                let possibleSubject = arySelected[selectedIndex];      // pull a random _id out of the subjects array
            
                if (aryDisplayed.findIndex(item =>  item._id === possibleSubject._id) === -1) {
                    const subjectToDisplay = subjects[selectedIndex]
                    aryDisplayed.push(possibleSubject);

                    setArrayTiles((prevState) => {
                        const aryOut = prevState?.slice();                         
                        aryOut?.splice(selectedIndex,1, subjectToDisplay)
                        return aryOut;
                    })                    
                    dispatch(cardgen_updateCompletedTileCount())
                    found = true;
                }               
            }

        }, appConfig.playLength /selectedSubjects.length)
        return interval;
    }, [selectedSubjects, subjects, dispatch])


    useEffect(() => {
        if(!enabled) {
            window.clearInterval(displayRandomSelectedSubject)    
        }
        setTimeout(() => {
            window.clearInterval(displayRandomSelectedSubject);
            cardgen_disableRoll()
        }, appConfig.playLength)
    }, [enabled, displayRandomSelectedSubject])


    useEffect(() => {

        let currIdx = 0;
        let nextIdx = 0;

        let aryOut:Subject[] = [];
        for(let i = 0; i < subjects.length; i++) {
            while (nextIdx === currIdx) {
                nextIdx = Math.floor(Math.random() * 6)+1;
            }            
            aryOut.push(
                {_id: '-1',
                subjectTitle: null, 
                subjectDesc: null,
                subjectShortDesc: null,
                subjectImg: `roller${nextIdx}.gif`,
                markDate: null,
                nohover: false,
                probability: 0})
            currIdx = nextIdx;
        }
        setArrayTiles(aryOut)


        dispatch(cardgen_enableRoll());
        setRootClass('bingo-card fadeable fade-in');
        dispatch(cardgen_queuemusic());
        getSelectedSubjects();
        //execRoll();
    }, [getSelectedSubjects, dispatch, subjects.length])


    return (
        <div className={rootClass}>
            <div className="card bg-light mb-3 bingo-card__bkg">
                <div className="card-body bingo-card__body">
                    <div className="bingo-card__wrapper">
                        {aryTiles && aryTiles.map((item: Subject, idx:number) => {
                            if(item._id === "-1") {
                                return (
                                    <img key={uuid()} alt={item.subjectTitle + ''} src={`../dist/images/subjects/${item.subjectImg}`} className='subject_tile-img subject_tile-img__rolling' />
                                )
                            } else {
                                return (
                                    <SubjectTile key={uuid()} idx={idx}  subject={item} />
                                )
                            }
                        
                        })}
                    </div>
                </div>
            </div>
            {/* <div>
                <ProbabilitReport />
            </div>            
            <div>            
                <PlayAgainButton handleClick={handleClick} />
            </div> */}
        </div>
                
    )
}

export default BingoCard;



