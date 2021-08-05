import {useState, useEffect, useCallback, useMemo} from 'react';
import {SubjectTile} from '../';
import {v4 as uuid} from 'uuid';
import {Subject, SelectedSubject, BingoCardProps} from '../interfaces';
import {useAppDispatch, useAppSelector} from '../hooks';
import {
        cardgen_updateSelected, 
        cardgen_queuemusic, 
        cardgen_disableRoll, 
        cardgen_updateCompletedTileCount} from '../appData';
import {appConfig} from '../helpers'



const BingoCard:React.FC<BingoCardProps> = (props:BingoCardProps) => {
    const dispatch = useAppDispatch();
    const {subjects} = useAppSelector(state => state.cardGenData);
    const {enabled, selectedSubjects} = useAppSelector(state => state.cardGenData.uiState);
    const [aryTiles, setArrayTiles] = useState<Subject[]>()
    const {cardId, cardData} = props;
    // const {savedCards} = useAppSelector(state => state.cardData)
    const [cardStyle, setCardStyle] = useState({})
    const showReport = useAppSelector(state => state.cardGenData.uiState.showReport)
    const [rootClass, setRootClass] = useState('subjects fade-in')
    
    // there will likely be more than 25 subjects to choose from down the road, this 
    // limits the total possible down 25, for a 5x5 matrix
    const tileLimit = 25;


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
        arySelected.splice(0, arySelected.length - tileLimit)
        dispatch(cardgen_updateSelected(arySelected))   // here we have an arra of subjectId's 

    }, [dispatch, subjects])


    const displayRandomSelectedSubject = useMemo(() => {
        // randomly display from the selected subjects array data from the subjects array
        // so that it appears the tiles are appearing at random intervals when displayed

        const arySelected:SelectedSubject[] = selectedSubjects.slice();
        
        const aryDisplayed:SelectedSubject[] = [];  // an array of tiles aready displayed 
        const interval = window.setInterval(() => {
            let found = false;
            if(selectedSubjects.length !== 0) {
                while(!found) {
                    const selectedIndex = Math.floor(Math.random() * arySelected.length);
                    let possibleSubject = arySelected[selectedIndex];      // pull a random _id out of the subjects array
            
                    if (aryDisplayed.filter(item =>  item._id === possibleSubject._id).length === 0) {
                        const subjectToDisplay = subjects.find(item => item._id === possibleSubject._id)
                        if(subjectToDisplay !== undefined) {
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
                }
            }


        }, appConfig.playLength /selectedSubjects.length)
        return interval;
    }, [selectedSubjects, subjects, dispatch])


    useEffect(() => {
        if(showReport) {
            setRootClass('subjects fade-in hidden')
        } else {
            setRootClass('subjects fade-in')
        }
    }, [showReport])


    useEffect(() => {
        // close the window, set enabled = false, so clear the interval
        if(!enabled) {
            window.clearInterval(displayRandomSelectedSubject)    
        }

        // run the interval timer for the length of the music
        setTimeout(() => {
            window.clearInterval(displayRandomSelectedSubject);
            cardgen_disableRoll()
        }, appConfig.playLength)

    }, [enabled, displayRandomSelectedSubject])

    useEffect(() => {
        const elem = document.getElementById('bingo-card') as HTMLDivElement;
        if(elem) {
            const w = elem.offsetWidth;
           setCardStyle({
               height: w+'px'
           })
        }

    }, [])


    useEffect(() => {
        if(!cardId) {
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
            setArrayTiles(aryOut.splice(0, tileLimit))
    
            dispatch(cardgen_queuemusic());
            getSelectedSubjects();
        } else {
            if(cardData) {
                //const card = savedCards?.filter(item => item._id === cardId)[0];
                setArrayTiles((prevState) => {
                    return cardData.selectedSubjects
                })
            }
        }
 
    }, [getSelectedSubjects, dispatch, subjects.length, cardId, cardData])


    return (
        <div className={rootClass}>
            <div className="card bg-light bingo-card__bkg" id="bingo-card" style={cardStyle}>
                <div className="card-body bingo-card__body">
                    <div className="bingo-card__wrapper">
                        {aryTiles && aryTiles.map((item: Subject, idx:number) => {
                            if(item._id === "-1") {
                                return (
                                    <img key={uuid()} alt={item.subjectTitle + ''} src={`${appConfig.rollImgRoot}/${item.subjectImg}`} className='subject_tile-img subject_tile-img__rolling' />
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
        </div>
                
    )
}

export default BingoCard;



