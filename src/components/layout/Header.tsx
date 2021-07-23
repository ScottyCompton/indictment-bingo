import {useAppSelector} from '../../hooks'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

const Header:React.FC = () => {

    const {user} = useAppSelector(state => state.appData.uiState);
    let fName = '';
    if(user) {
        fName = user.name.split(' ')[0]!
    }
    return (
        <div className="header bg-primary">
            <div className="header-logo">
                <div className="header-logo__image">
                    <a href="/"><img src="./dist/images/nothing.png" alt="Trump World Indictment Bingo!" /></a>
                </div>
            </div>

            <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/about">What It Is</Nav.Link>
                    <Nav.Link href="/howitworks">How It Works</Nav.Link>
                    <Nav.Link href="/subjects">Wall Of Shame</Nav.Link>
                    {user && 
                    <NavDropdown title={fName} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/account">Your Account</NavDropdown.Item>
                    <NavDropdown.Item href="/cards">Your Cards</NavDropdown.Item>
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                    </NavDropdown>                    
                    }

                    {!user && 
                    <NavDropdown title="Join the fun!" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/signup">Create Account</NavDropdown.Item>
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    </NavDropdown>                    
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>

{/* 
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#nowhere">What It Is</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#nowhere">How It Works
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#nowhere">Subjects</a>
                            </li>
                            {user && 
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#you" role="button" aria-haspopup="true" aria-expanded="false">Scotty</a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="/cards">Your Cards</a>
                                        <a className="dropdown-item" href="/account">Your Account</a>
                                        <a className="dropdown-item" href="/logout">Logout</a>
                                    </div>
                                </li>
                            }
                            {!user && 
                               <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#you" role="button" aria-haspopup="true" aria-expanded="false">Join the fun!</a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="/login">Login</a>
                                        <a className="dropdown-item" href="/signup">Signup</a>
                                    </div>
                                </li>
                            }

                        </ul>

                    </div>
                </div>
                </nav> */}

        </div>
    )
}

export default Header;