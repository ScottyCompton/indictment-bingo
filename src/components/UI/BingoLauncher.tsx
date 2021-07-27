import React from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useState} from 'react';
import {cardgen_showGenerator} from '../../appData';
import {withRouter, useHistory} from 'react-router-dom';
import {LoginModal} from '../../components';



const BingoLauncher:React.FC = (props:any) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.appData.uiState.user);
    const cardsRemaining = useAppSelector(state => state.appData.uiState.user?.cardsRemaining);
    const history = useHistory();
    const [showLoginModal, setShowLoginModal] = useState(false);


    const handleClick = (e:any) => {
        if(!user) {
            handleOpenLoginModal(e);
        } else {
            if(cardsRemaining === 0) {
                history.push('/paywall')
            } else {
                dispatch(cardgen_showGenerator(true))
            }
        }
    }


    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    }


    const handlePostLogin = () => {
        dispatch(cardgen_showGenerator(true));
        //history.push('/cards');
    }


    const handleOpenLoginModal = (e:any) => {
        if(showLoginModal) {
            setShowLoginModal(false)
        }
        e.preventDefault();
        setShowLoginModal(true);
        e.target.classList.remove('active');
    }

    return (
        <>
            {React.cloneElement(props.children, {onClick: handleClick})}
        <LoginModal showLoginModal={showLoginModal} handlePostLogin={handlePostLogin} handleClose={handleCloseLoginModal} />
        </>
    )

}

export default withRouter(BingoLauncher)