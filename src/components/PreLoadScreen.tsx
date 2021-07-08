import {useState, useEffect, useCallback} from 'react';
import statusVals from '../fixtures/statusValues.json';
import {useAppDispatch} from '../hooks';
import {app_navigate} from '../appData';
import {PreloadScreenProps} from '../interfaces';

const PreLoadScreen:React.FC<PreloadScreenProps> = (props:PreloadScreenProps) => {
    const [rootClass, setRootClass] = useState('preload-screen fade-out fadeable');
    const [status, setStatus] = useState({statusVal: 0, statusText: 'Here we go...'});
    const [loaded, setLoaded] = useState(false);
    const {statusValues} = statusVals;
    const dispatch = useAppDispatch();


    const doPreload = useCallback(() => {
        setLoaded(false);
        setRootClass('preload-screen fade-in fadeable');

        const updateStatus = (status: {statusText: string, statusVal: number}, idx:number) => {
            setStatus((prevState) => {
                if(idx === statusValues.length-1) {
                    setLoaded(true);
                }
                return status;              
            })
        }

        statusValues.forEach((item, idx) => {
            setTimeout(() => {
                updateStatus(item, idx)
            }, idx*2000)
        })
    }, [statusValues])



    useEffect(() => {
        doPreload()
    }, [doPreload])   


    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setTimeout(() => {
            props.handleClick();
        }, 750)
        setRootClass('preload-screen fade-out fadeable');
        dispatch(app_navigate('STEP_4'));      
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

            {loaded && <button id="btnLoadBingo" onClick={handleClick} className="btn btn-success form-control big-button">GENERATE YOUR BINGO CARD!</button>}
            {!loaded && <button id="btnLoadBingo" disabled={true} className="btn btn-secondary form-control big-button">GENERATE YOUR BINGO CARD!</button>}
        </div>
    )
}

export default PreLoadScreen;