import { useEffect, useState } from 'react';
import {useAppSelector} from '../../hooks/redux-hooks';

const LoadingOverlay:React.FC = () => {

    const {isLoading} = useAppSelector(state => state.appData.uiState);
    //const isLoading = true;
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

                <div className="card bg-dark loading-overlay__card">
                    <div className="card-body">
                        <div className="loading-overlay__loadingmsg text-white">
                        {loadingMsg}
                    </div>
                    <img src="../dist/images/spinner.gif" className="loading-overlay__spinner" alt=""/>
                    </div>
                </div>                
                    
                </div>            
            </div>
    )
}

export default LoadingOverlay;