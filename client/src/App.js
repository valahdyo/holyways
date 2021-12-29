import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import Routes from './routes/routes';
import {useEffect, useState, useContext} from 'react'
import {AuthContext} from './context/AuthContext'
import { API, setAuthToken } from "./config/api";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/NavbarStyle.css'
import './styles/HomepageStyle.css'
import './styles/ProfilepageStyle.css'
import './styles/DonateInfoStyle.css'
import './styles/FormfundpageStyle.css'

if (localStorage.accessToken) {
  setAuthToken(localStorage.accessToken);
}

function App() {
  let history = useHistory();
  const [state, dispatch] = useContext(AuthContext);

  const checkUser = async () => {
    try {
      if (localStorage.accessToken) {
        setAuthToken(localStorage.accessToken);
      }
      const response = await API.get("/check-auth");
      // If the token incorrect
      if (response.status !== 200) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.accessToken = localStorage.accessToken;

      // Send data to useContext
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Router>
      <Routes/>
    </Router>
  );
}

export default App;
