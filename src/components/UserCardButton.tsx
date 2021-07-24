import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export interface UserCardButtonProps {
    handleClick: (cardId?: string) => void;
    iconProps: FontAwesomeIconProps
    disabled?: boolean | false;
    altText?: string;
}


const UserCardButton:React.FC<UserCardButtonProps> = (props:UserCardButtonProps) => {

    const {iconProps, disabled, altText} = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!disabled) {
            props.handleClick();
        }
    }

    return (
        <button type="button" title={altText} disabled={disabled} className="usercardlist__button" onClick={handleClick}>
            <FontAwesomeIcon {...iconProps} />
        </button>
    )
}

export default UserCardButton;