import React, {useState, useEffect} from 'react';
import {app_executeLogin} from '../appData/';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import { useHistory, withRouter } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';


const Login:React.FC = () => {
    const [loginData, setLoginData] = useState({username: '', password: ''});
    const [loginAttempt, setLoginAttempt] = useState(false);
    const user = useAppSelector(state => state.appData.uiState.user);
    const dispatch = useAppDispatch();
    const history = useHistory();
 

    useEffect(() => {
        if(user && user.token) {
            history.push('/cards')
        }
    }, [history, user])


  
    const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginAttempt(true);
        dispatch(app_executeLogin(loginData))
    }

    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prev) => {
            return {
                ...prev,
                username: e.target.value
            }
        })        
    }
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prev) => {
            return {
                ...prev,
                password: e.target.value
            }
        })        
    }
    return (
        <Container>
        <Row>
            <Col xs="12" className="align-center">
                <div className="card text-white bg-secondary mb-3" style={{maxWidth: '30rem', margin: '5rem auto 0'}}>
                <div className="card-header">Login</div>
                <div className="card-body">
                    <h4 className="card-title">WebFolio 2.0</h4>
                    <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username:</label><input className="form-control" id="username" onChange={handleUsernameChange} type="text" value={loginData.username} />
                            <label htmlFor="password">Password:</label><input className="form-control" id="password" onChange={handlePasswordChange} type="password" value={loginData.password} />
                            <br />
                            <button type="submit" className="btn btn-primary float-right">Login</button>
                        </form>
                </div>
                </div>
                {loginAttempt && <div className="text-center"><p className="text-danger" style={{margin: '0 auto'}}>Login incorrect - you shall not pass!</p></div>}

            </Col>
        </Row>
        </Container>
    )
}


export default withRouter(Login);