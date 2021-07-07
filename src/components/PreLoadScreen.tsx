import {useState, useEffect} from 'react';
import {PreLoadScreenProps} from '../interfaces';


const PreLoadScreen:React.FC<PreLoadScreenProps> = (props:PreLoadScreenProps) => {
    const [rootClass, setRootClass] = useState('preload-screen fade-out fadeable');
    const [status, setStatus] = useState({statusVal: 0, statusText: 'Here we go...'});
    const [loaded, setLoaded] = useState(false);

    const statusVals = [
        {
            statusText: 'Interviewing Witnessses',
            statusVal: 10
        },
        {
            statusText: 'Aquiring Tax Returns',
            statusVal: 22,
        },        
        {
            statusText: 'Gathering Evidence',
            statusVal: 34
        },
        {
            statusText: 'Informing The Attorney General',
            statusVal: 56
        },
        {
            statusText: 'Conducting Grand Jury Hearings',
            statusVal: 72
        },
        {
            statusText: 'Filing Indictments',
            statusVal: 85
        },
        {
            statusText: 'Coordinating with the FBI',
            statusVal: 96
        },
        {
            statusText: 'BINGO!',
            statusVal: 100,
            done: true
        },

    ]



    useEffect(() => {
        setLoaded(false);
        setRootClass('preload-screen fade-in fadeable');

        const updateStatus = (status:{statusText: string, statusVal: number}, idx:number) => {
            setStatus((prevState) => {
                if(idx === statusVals.length-1) {
                    setLoaded(true);
                }
                return status;              
            })

            
        }

        statusVals.forEach((item, idx) => {
            setTimeout(() => {
                updateStatus(item, idx)
            }, idx*2000)
        })

    },[])   


    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setRootClass('preload-screen fade-out fadeable');
        setTimeout(() => {
            props.onNav('STEP4')
        },750)        
    }

    return (
        <div className={rootClass}>
            <div className="card bg-light mb-3">
                <div className="card-body">
                <div className="preload-screen__statustext"><h3 className="text-primary">{status.statusText}</h3></div>
                    <div className="progress preload-screen__progress-bar">
                        <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: `${status.statusVal}%`}} aria-valuenow={status.statusVal} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                </div>
            </div>

            {loaded && <button id="btnLoadBingo" onClick={handleClick} className="btn btn-success form-control big-button">CLAIM YOUR BINGO CARD!</button>}
            {!loaded && <button id="btnLoadBingo" disabled={true} className="btn btn-secondary form-control big-button">CLAIM YOUR BINGO CARD!</button>}
        </div>
    )
}

export default PreLoadScreen;