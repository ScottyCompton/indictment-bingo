import {appConfig, http} from '../../helpers';
import {useEffect, useState} from 'react';
import {Subject} from '../../interfaces';
import {withRouter, useHistory} from 'react-router-dom';
import {useAppSelector} from '../../hooks';



const LatestSubject:React.FC = () => {
    const [subject, setSubject] = useState<Subject | null>(null)
    const gameId = appConfig.gameId;
    const history = useHistory();
    const {user} = useAppSelector(state => state.appData.uiState)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;

        http.getData(`/games/${gameId}/latestmarkedsubject`)
            .then((response:Subject) => {
                if(response._id) {
                    if(mounted) {
                        setSubject(response)
                        setIsLoaded(true)
                    }
                }
            })

        return function cleanup() {
            mounted = false;
        }
    }, [gameId])




    const handleViewDetailsClick = () => {
        if(subject!.subjectTitle) {
            let subjPath = subject!.subjectTitle.toLocaleLowerCase();
            subjPath = subjPath.replace('.','').replaceAll(' ','_');
            history.push('/subjects/' + subjPath)    
        }
    }

    const handleViewCards = () => {
        if(user) {
            history.push('/cards');
        } else {
            alert('You must be logged in to use this feature.')
        }
    }


    return (
        <>
            {
                (subject && isLoaded) &&
                <div className="sidebar__widget">
                    <div className="latest-subject-widget">
                    <h6 className="widget-title">LATEST TRUMP WORLD INDICTEE</h6>
                    <div className="sidebar__widget-text text-center winner">Winner Winner Chicken Dinner!<br />&nbsp;</div>
                        <div className="card">
                            <div className="card-body">
                                <div className="latest-subject-widget__img">
                                    <img src={`${appConfig.subjImgRoot}/${subject.subjectImg}`} alt={`${subject.subjectTitle}`} />
                                    <h6>{subject.subjectTitle}</h6>
                                </div>
                                <div className="sidebar__widget-text">
                                    {subject.subjectShortDesc}
                                </div>
                                <div className="latest-subject-widget__btns">
                                <button className="btn btn-primary btn-sm" onClick={handleViewDetailsClick}>View Details</button>
                                <button className="btn btn-primary btn-sm" onClick={handleViewCards}>Your Cards</button>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            }
        </>
        )
}

export default withRouter(LatestSubject);