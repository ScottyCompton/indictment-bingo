import { useEffect, useState } from 'react';
import {useAppSelector} from '../../hooks/redux-hooks';

const LoadingOverlay:React.FC = () => {

    const {isLoading} = useAppSelector(state => state.appData.uiState);
    const {loadingMsg} = useAppSelector(state => state.appData.uiState)
    const [showOverlay, setShowOverlay] = useState(isLoading);
    const [rootClass, setRootClass] = useState('loading-overlay');


    useEffect(() => {
        setRootClass(showOverlay ? 'loading-overlay  loading-overlay--loading' : 'loading-overlay')
    }, [showOverlay])

    useEffect(() => {
        setShowOverlay(isLoading)
    }, [isLoading])


    return (
        <div className={rootClass}>
            <div className="loading-overlay__inner">
                <div className="loading-overlay_loadingmsg text-white">
                    {loadingMsg}
                </div>
                <img src="../dist/images/spinner.gif" className="loading-overlay__spinner" alt=""/>
            </div>            
        </div>
    )
}

export default LoadingOverlay;