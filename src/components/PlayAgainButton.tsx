import {useAppSelector, useAppDispatch} from '../hooks';
import {app_reeinitialize} from '../appData';


export interface PlayAgainButtonProps {
    handleClick: () => void;
}

const PlayAgainButton:React.FC<PlayAgainButtonProps> = (props:PlayAgainButtonProps) => {
    const dispatch = useAppDispatch()
    const rollComplete = useAppSelector(state => state.appData.uiState.rollComplete)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.handleClick();
        dispatch(app_reeinitialize());
    }



    return (
        <div>
            {rollComplete && <button onClick={handleClick} className="btn btn-success big-button form-control">PLAY AGAIN</button>}
        </div>
    )
}
export default PlayAgainButton;