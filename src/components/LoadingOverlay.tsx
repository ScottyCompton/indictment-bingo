import { useEffect, useState } from 'react';
import {useAppSelector} from '../hooks/redux-hooks';

const LoadingOverlay:React.FC = () => {

    const {isLoading} = useAppSelector(state => state.appData.uiState);
    //const isLoading = true;
    const [rootClass, setRootClass] = useState('loading-overlay');
    const cardGenScreen = useAppSelector(state => state.cardGenData.uiState.screen)
    const [loadingMessage, setLoadingMessage] = useState('Loading data please wait');

    useEffect(() => {
        setRootClass(isLoading ? 'loading-overlay  loading-overlay--loading' : 'loading-overlay')
        if(cardGenScreen === 'GENERATE') {
            setLoadingMessage('Please wait while we save your card.  Image will download shortly.')
        } else {
            setLoadingMessage('Loading data please wait')
        }
    }, [isLoading, cardGenScreen])




    return (
        <div className={rootClass}>
            <div className="loading-overlay__inner">
                <div className="loading-overlay_loadingmsg text-white">
                    {loadingMessage}
                </div>
                <img src="../dist/images/spinner.gif" className="loading-overlay__spinner" alt=""/>
            </div>            
        </div>
    )
}

export default LoadingOverlay;