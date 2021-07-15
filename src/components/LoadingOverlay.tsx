import { useEffect, useState } from 'react';
import {useAppSelector} from '../hooks/redux-hooks';

const LoadingOverlay:React.FC = () => {

    const {isLoading} = useAppSelector(state => state.appData.uiState);
    const [rootClass, setRootClass] = useState('loading-overlay');

    useEffect(() => {
        setRootClass(isLoading ? 'loading-overlay  loading-overlay--loading' : 'loading-overlay')
        
    }, [isLoading])


    return (
        <div className={rootClass}>
            <div className="loading-overlay__inner">
                <img src="../dist/images/spinner.gif" className="loading-overlay__spinner" alt=""/>
            </div>            
        </div>
    )
}

export default LoadingOverlay;