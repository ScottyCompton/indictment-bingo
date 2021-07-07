import { SplashScreenProps } from "../interfaces";
import {useState, useEffect} from 'react';

const SplashScreen:React.FC<SplashScreenProps> = (props: SplashScreenProps) => {
    const [rootClass, setRootClass] = useState('splash-screen fadeable');

    useEffect(() => {
        setRootClass('splash-screen fade-in fadeable');
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setRootClass('splash-screen fade-out fadeable');
        setTimeout(() => {
            props.onNav('STEP2');
        },750)    
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