import {useState, useEffect} from 'react';
import statusVals from '../fixtures/statusValues.json';
import {useAppDispatch} from '../hooks';
import {PreloadScreenProps} from '../interfaces';
import {cardgen_enableRoll} from '../appData'

const PreLoadScreen:React.FC<PreloadScreenProps> = (props:PreloadScreenProps) => {
    const [status, setStatus] = useState({statusVal: 0, statusText: 'Here we go...'});
    const {statusValues} = statusVals;
    const dispatch = useAppDispatch();


    useEffect(() => {
        let mounted = true;

        const updateStatus = (status: {statusText: string, statusVal: number}, idx:number) => {
            setStatus((prevState) => {
                if(idx === statusValues.length-1) {
                    setTimeout(() => {dispatch(cardgen_enableRoll())},200)
                }
                return status;              
            })
        }

        statusValues.forEach((item, idx) => {
            setTimeout(() => {
                if(mounted) {
                    updateStatus(item, idx)
                }
            }, idx*1000)
        })

        return function cleanup() {
            mounted = false;
        }

    }, [dispatch, statusValues])   


    return (
        <div className="'preload-screen fade-in">
            <div className="splash-screen__container">
                <div className="splash-screen__img"></div>
            </div>
            <div className="preload-screen__statustext"><h6 className="text-light">{status.statusText}</h6></div>
            <div className="progress preload-screen__progress-bar">
                <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: `${status.statusVal}%`}} aria-valuenow={status.statusVal} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
            
         </div>

    )
}

export default PreLoadScreen;