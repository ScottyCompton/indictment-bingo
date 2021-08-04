
import {faUndo} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NoLandscape:React.FC = () => {    
    return (
        <div className="no-landscape">
            <div className="no-landscape__message">   
                <FontAwesomeIcon icon={faUndo} size="3x" className="no-landscape__undo" />
                <h6 className="text-white text-center">This app does not support landscape orientation on mobile devices.  <br /><br />Not that you need it...</h6>
            </div>
        </div>
    )
    
}

export default NoLandscape;