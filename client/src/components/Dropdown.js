import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from "react-router-dom";
import { API } from '../config/api'

import { Dropdown } from "react-bootstrap";
import Avatar from "../assets/avatar.png"
import IconProfile from "../assets/icon-profile.png"
import IconRaiseFund from "../assets/icon-raisefund.png"
import IconLogout from "../assets/icon-logout.png"

function DropdownComponent(props) {

  const [state, dispatch] = useContext(AuthContext)
  const history = useHistory()
  const {handleRaisefund, handleProfile} = props

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch({type: 'LOGOUT'})
    history.push('/')
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-basic"
        ><img src={Avatar} alt="avatar"></img></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleProfile}><img className="mr-3" src={IconProfile} alt="profile"/>Profile</Dropdown.Item>
          <Dropdown.Item onClick={handleRaisefund}><img className="mr-3" src={IconRaiseFund} alt="raise-fund"/>Raise Fund</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}><img className="mr-3" src={IconLogout} alt="logout"/>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropdownComponent;
