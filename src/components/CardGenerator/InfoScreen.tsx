import {useState, useEffect} from 'react';
import {useAppDispatch} from '../../hooks';
import {cardgen_navigate} from '../../appData';

const InfoScreen:React.FC = () => {
    const [rootClass, setRootClass] = useState('info-screen fade-out fadeable');
    const dispatch = useAppDispatch()

    useEffect(() => {
        setRootClass('info-screen fade-in fadeable');
    },[])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setRootClass('info-screen fade-out fadeable');
        dispatch(cardgen_navigate('PRELOAD'));
    }


    return (
        <div className={rootClass}>
            <div className="card bg-light mb-3">
                <div className="card-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget tempor velit. Maecenas augue dolor, scelerisque id lacus id, feugiat vehicula tortor. Suspendisse condimentum libero vel neque condimentum bibendum. Nullam eleifend aliquam metus. Vestibulum molestie ligula quis nisi venenatis porta. Nam ut volutpat urna, eget condimentum urna. Cras eu tincidunt sem.</p>
                </div>
            </div>
            <button id="btnGo" onClick={handleClick} className="btn form-control btn-success big-button">GET MY BINGO CARD!</button>

        </div>
    )
}

export default InfoScreen;