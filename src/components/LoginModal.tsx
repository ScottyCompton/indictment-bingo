
import {Modal, Container, Row, Col} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {app_loginUser, app_setIsLoading} from '../appData/';
import {useAppDispatch} from '../hooks/redux-hooks';
import {http} from '../helpers';


export interface LoginModalProps {
    showLoginModal: boolean;
    handleClose: () => void;
    handlePostLogin: () => void;
}

const LoginModal:React.FC<LoginModalProps> = (props:LoginModalProps) => {
    const [loginData, setLoginData] = useState({username: '', password: ''});
    const [loginAttempt, setLoginAttempt] = useState(false);
    const {showLoginModal, handlePostLogin} = props;
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoginData({username: '', password: ''});
        setLoginAttempt(false);
        setShow(showLoginModal);
    }, [showLoginModal])

  
    const handleClose = () => {
        props.handleClose();
    }



    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const execLogin = async () => {
            const putConfig = {
                body: {
                    email: loginData.username,
                    password: loginData.password
                }
            }
            dispatch(app_setIsLoading({isLoading: true, loadingMsg: 'Logging in...'}))
            await http.getData('/users/login',putConfig)
            .then((result) => {
                if(result && result.user) {
                    dispatch(app_loginUser(result))
                    handlePostLogin();
                    setShow(false)
                } else {
                    setLoginAttempt(true);
                }
                dispatch(app_setIsLoading({isLoading: false}))
            })
            .catch(() => {
                dispatch(app_setIsLoading({isLoading: false}))
            })        
        }


        execLogin();

    }

    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginAttempt(false)
        setLoginData((prev) => {
            return {
                ...prev,
                username: e.target.value
            }
        })        
    }

    
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginAttempt(false)
        setLoginData((prev) => {
            return {
                ...prev,
                password: e.target.value
            }
        })        
    }    
    

    return (
        <Modal 
        id="login-modal"
        contentClassName="login-modal bg-primary"
        backdrop="static"
        keyboard={false}
        centered aria-labelledby="contained-modal-title-vcenter"
        show={show} 
        onHide={handleClose}>
        <Modal.Header>
            <h6 className="text-warning">
                Please Login Below
            </h6>
        </Modal.Header>
        <Modal.Body className="login-modal__body">
            <Container>
            <Row>
                <Col xs="12" className="align-center">
                    <div className="card  bg-secondary mb-3" style={{maxWidth: '30rem', margin: '0 auto'}}>
                    <div className="card-body">
                        <form >
                                <label htmlFor="username">Username:</label><input className="form-control" id="username" onChange={handleUsernameChange} type="text" value={loginData.username} />
                                <label htmlFor="password">Password:</label><input className="form-control" id="password" onChange={handlePasswordChange} type="password" value={loginData.password} />
                                <br />
                            </form>
                    </div>
                    </div>
                    {loginAttempt && <div className="text-center"><p className="text-danger" style={{margin: '0 auto'}}>Login incorrect - you shall not pass!</p></div>}

                </Col>
            </Row>
            </Container>
        </Modal.Body>        
        <Modal.Footer>
        <button onClick={handleLoginClick} type="button" className="btn btn-primary float-right">Login</button>  
        <button onClick={handleClose} type="button" className="btn btn-primary float-right">Cancel</button>  
                    
        </Modal.Footer>
      </Modal>
    )
}

export default LoginModal;