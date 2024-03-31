import "./App.css";
import PrimalApi from "./api";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import RoutesList from "./RoutesList";
import UserContext from "./UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  // if authToken exists, signs in user using token
  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("authToken")) {
        let token = localStorage.getItem("authToken");
        try {
          let username = jwtDecode(token);
          PrimalApi.token = token
          let currentUser = await PrimalApi.getCurrentUser(username.username);
          setCurrentUser(currentUser);
        } catch (e) {
          console.log(e);
          console.log("---");
        }
      }
    }
    getUser();
  }, [token]);


  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
  }

  /** Handles site-wide signup.
   *
   * Automatically logs user in (set token) upon signup.
   */
  async function signup(signupData) {
    try {
      let token = await PrimalApi.signup(signupData);
      localStorage.setItem('authToken', token);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.*/
  async function login(loginData) {
    try {
      let token = await PrimalApi.login(loginData);
      localStorage.setItem('authToken', token);
      setToken(token);
      return { 
        success: true,
        token
      };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <RoutesList login={login} signup={signup} logout={logout}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
