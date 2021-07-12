import {useState, useEffect} from 'react';
import {useAppDispatch} from '../../hooks';
import {cardgen_navigate} from '../../appData';


const SplashScreen:React.FC = () => {
    const [rootClass, setRootClass] = useState('splash-screen fadeable');
    const dispatch = useAppDispatch()

    useEffect(() => {
        setRootClass('splash-screen fade-in fadeable');
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setRootClass('splash-screen fade-out fadeable');
        dispatch(cardgen_navigate('GENERATE'));   
    }


    return (
        <div className={rootClass}>
            <div className="splash-screen__container">
                <div className="splash-screen__img"></div>
                
                <button className="btn btn-success form-control big-button" onClick={handleClick}>CLICK HERE TO BEGIN!</button>
            </div>
        </div>
        
    )
}

export default SplashScreen;