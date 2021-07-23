import {Toast} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {clearError} from '../../appData/appDataSlice';


const ToastNotification:React.FC = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.appData.uiState?.appError)
    const [show, setShow] = useState(false);
    const [errMsg, setErrorMsg] = useState('')


    useEffect(() => {
        if(error) {
            setShow(true)
            if(error.error.description) {
                setErrorMsg(error.error.message)
            }
        } else {
            setShow(false)
        }
    }, [error])


    const handleClose = () => {
        setShow(false);
        dispatch(clearError())
    }


    return (
        <div className="toast-notification">
            <Toast onClose={handleClose} show={show} animation={true}>
            <Toast.Header>
                <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
                />
                <strong className="me-auto">Oops.. had a little problem</strong>
            </Toast.Header>
            <Toast.Body>Server reported the following issue: Error {errMsg}</Toast.Body>
            </Toast>
        </div>

    )
}

export default ToastNotification;