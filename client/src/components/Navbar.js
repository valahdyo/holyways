import { useState, useContext, useEffect } from "react";
import {useHistory, Link} from 'react-router-dom'
import {
  Nav,
  Navbar,
  Button,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import DropdownComponent from "./Dropdown";
import LoginModalComponent from "./LoginModal";
import RegisterModalComponent from "./RegisterModal";
import Logo from "../assets/brand-logo.png";

function NavbarComponent() {

  const  [state, dispatch]  = useContext(AuthContext)
  const history = useHistory()

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => setShowRegister(true);
  
  useEffect(() => {
    
  }, [state])
  
  const handleProfile = () => {
    history.push('/profile')
  }

  const handleRaisefund = () => {
    history.push('/raisefund')
  }

  const closeLogin = () => setShowLogin(false);
  const closeRegister = () => setShowRegister(false);




  return (
    <>
      <Navbar className="navTheme">
        <Navbar.Brand as={Link} to='/'>
          <img
            alt=""
            src={Logo}
            width="65"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Nav className="ml-auto px-2">
          {state.isLogin === true ? (
            <DropdownComponent handleProfile={handleProfile} handleRaisefund={handleRaisefund} />
          ) : (
            <>
              <Button onClick={handleShowLogin} className="navBtnLogin">
                Login
              </Button>
              <Button onClick={handleShowRegister} className="navBtnRegister">Register</Button>
            </>
          )}
        </Nav>
      </Navbar>

      <LoginModalComponent closeLogin={closeLogin} showLogin={showLogin} handleShowRegister={handleShowRegister} />
      <RegisterModalComponent closeRegister={closeRegister} showRegister={showRegister} />
    </>
  );
}

export default NavbarComponent;