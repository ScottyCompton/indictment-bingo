
interface PlayAgainButtonProps {
    showButton: boolean;
    handleClick: (e:any) => void;
}

const PlayAgainButton:React.FC<PlayAgainButtonProps> = (props:PlayAgainButtonProps) => {
    return (
        <div>
            {props.showButton && <button onClick={props.handleClick} className="btn btn-success big-button form-control">PLAY AGAIN</button>}
        </div>
    )
}
export default PlayAgainButton;