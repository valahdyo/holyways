import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./routes/routes"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { API, setAuthToken } from "./config/api"

import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/NavbarStyle.css"
import "./styles/HomepageStyle.css"
import "./styles/ProfilepageStyle.css"
import "./styles/DonateInfoStyle.css"
import "./styles/FormfundpageStyle.css"
import "./styles/ChatStyle.css"
import "./styles/style.css"

if (localStorage.accessToken) {
  setAuthToken(localStorage.accessToken)
}

function App() {
  const [state, dispatch] = useContext(AuthContext)

  const checkUser = async () => {
    try {
      if (localStorage.accessToken) {
        setAuthToken(localStorage.accessToken)
      }

      const response = await API.get("/check-auth")
      let payload = response.data.data.user
      payload.accessToken = localStorage.accessToken

      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: "AUTH_ERROR",
      })
    }
  }

  useEffect(() => {
    checkUser()
  }, [state.isLogin])

  /*   useEffect(() => {
      if (state.isLogin) {
        history.push("/");
      }
    }, [state]); */

  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App
