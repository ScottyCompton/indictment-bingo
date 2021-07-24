import {faUser, faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useAppSelector, useAppDispatch} from '../../hooks'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {app_logoutUser} from '../../appData';
import { useHistory, withRouter } from "react-router-dom";
import {LoginModal} from '../../components';
import {useState, useEffect, useRef} from 'react';
//import {useEvent} from '../../hooks';

const Header:React.FC = () => {
    const history = useHistory();
    const user = useAppSelector(state => state.appData.uiState.user);
    const dispatch = useAppDispatch();
    const fName = user ? user.name.split(' ')[0]! : '';
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navBreakpoint = 992;
    const [navCollapsed, setNavCollapsed] = useState(window.outerWidth <= navBreakpoint)
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleResize = () => {
            if(headerRef.current !== null) {
                const headerWidth = headerRef.current.offsetWidth;
                setNavCollapsed(headerWidth <= navBreakpoint)             
            }
        }

        // initiate the event handler
        window.addEventListener('resize', handleResize, false)
    
        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
          window.removeEventListener('resize', handleResize)
        }
      })

    const handleLogout = (e:any) => {
        e.preventDefault();
        dispatch(app_logoutUser());
        history.push('/')
    }


    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    }


    const handlePostLogin = () => {
        history.push('/cards');
    }


    const handleOpenLoginModal = (e:any) => {
        if(showLoginModal) {
            setShowLoginModal(false)
        }
        e.preventDefault();
        setShowLoginModal(true);
        e.target.classList.remove('active');
    }



    const navbarPrimary = () => {
        return (
            <Nav className="me-auto">
                {navCollapsed && navbarAcctDropdown()}                   
                <Nav.Link href="/howitworks">How It Works</Nav.Link>
                {user && <Nav.Link href="/cards">Play Bingo!</Nav.Link>}
                <Nav.Link href="/subjects">The Indictables</Nav.Link>                   
                <Nav.Link href="/indictable-news">Indictable News</Nav.Link>                   
                <Nav.Link href="/indictable-swag">Indictable Swag</Nav.Link>                   
                <Nav.Link href="/about">But... why?</Nav.Link>                   
                <Nav.Link href="/hate-mail">Hate Mail</Nav.Link>                   
                <Nav.Link href="/donate">Donate</Nav.Link>
            </Nav>
        )
    }

    const navbarAcctDropdown = () => {
        return (
                <div className="header--acctnav__userinfo">
            {user &&
                <>
                <div className="header--acctnav__icon"><FontAwesomeIcon icon={faUser} /></div>
                <NavDropdown title={fName} id="header-acctnav">
                <NavDropdown.Item href="/account">Your Account</NavDropdown.Item>
                <NavDropdown.Item href="/cards">Play Bingo!</NavDropdown.Item>
                <NavDropdown.Item href="#logout" onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
                </>                    
                }
    
                {!user &&
                <>
                <FontAwesomeIcon className="header--acctnav__icon" icon={faSignInAlt} /> 
                <NavDropdown title="Join the fun!" id="header-acctnav">
                <NavDropdown.Item href="/signup">Create Account</NavDropdown.Item>
                <NavDropdown.Item href="#login" onClick={handleOpenLoginModal}>Login</NavDropdown.Item>
                </NavDropdown>   
                </>                 
                }
            </div>
        )
    }

    const navbarAcct = () => {
        return (
            <Nav className="justify-content-end header--acctnav">
            {navbarAcctDropdown()}
            </Nav>
        )
    }


    return (
        <>
        <div className="header" id="primary-header" ref={headerRef}>
        <Navbar bg="light" className="py-0" variant="light" expand="lg">
            <Navbar.Brand className="py-0" href="/">
                <img className="header--logo" src="./dist/images/logo.png" alt="Trump World Indictment Bingo!" />     
            </Navbar.Brand>
            <Container>
                <Navbar.Toggle className="header--toggle"  aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                {!navCollapsed && navbarAcct()}
                {navCollapsed && navbarPrimary()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {!navCollapsed && 
           <Navbar bg="dark" className="py-0" variant="dark" expand="lg">
            <Container>
            {navbarPrimary()}
            </Container>
        </Navbar>}
        </div>
 


        <LoginModal showLoginModal={showLoginModal} handlePostLogin={handlePostLogin} handleClose={handleCloseLoginModal} />
        </>

    )
}

export default withRouter(Header);