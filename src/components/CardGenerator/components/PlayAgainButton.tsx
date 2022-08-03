import {useAppSelector, useAppDispatch} from '../hooks';
import {cardgen_reeinitialize} from '../appData';
import {PlayAgainButtonProps} from '../interfaces';



const PlayAgainButton:React.FC<PlayAgainButtonProps> = (props:PlayAgainButtonProps) => {
    const dispatch = useAppDispatch()
    const rollComplete = useAppSelector(state => state.cardGenData.uiState.rollComplete)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.handleClick();
        dispatch(cardgen_reeinitialize());
    }



    return (
        <div>
            {rollComplete && <button onClick={handleClick} className="btn btn-warning big-button form-control">SAVE THIS CARD</button>}
        </div>
    )
}
export default PlayAgainButton;