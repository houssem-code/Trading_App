import './App.css';
import { useState } from 'react'
import HomePage from './app/home-page/HomePage.js'
import Platform from './app/platform/Platform.js'
import { isAuthenticated, getProfile } from './services/authentification-service'
import { clearAuthToken } from './services/localStorage-service'
import AuthentificationContext from './context/authentification-context'
import { useHistory , withRouter  } from "react-router-dom";
import Notification from './app/shared/notification/Notification'

function App() {

  const [authenticated, setAuthenticated] = useState(isAuthenticated())
  const [profile, setProfile] = useState(getProfile())
  const history = useHistory();

  const logIn = () => {

    setAuthenticated(true)
    setProfile(getProfile())
    history.push({ pathname: "/admin/user" })

  }

  const logOut = () => {

    clearAuthToken()
    setAuthenticated(false)
    setProfile({
      login: "",
      authority: ""
    })
    history.push({ pathname: "/login" })
    Notification('success', '', "À bientôt")

  }

  const value = {
    authenticated: authenticated,
    profile: profile,
    logIn: logIn,
    logOut: logOut
  }
  



  return (


      <div className="App">

        <AuthentificationContext.Provider value={value}>

          {authenticated ?  <Platform /> : <HomePage />}

        </AuthentificationContext.Provider>

      </div>

  );
}

export default  withRouter(App);
