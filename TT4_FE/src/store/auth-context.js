import React, { useState } from "react";
import { API_URL } from '../Constants';

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// named export
export const AuthContextProvider = (props) => {
    const user = {
        email: "",
        accBal: 0,
        currLoan: 0,
        loanHist: "No history now",
        existingLoan: []
    }

  const [token, setToken] = useState(null);
  const [ userLogged, setUserLogged ] = useState(user)
  const userIsLoggedIn = !!token; // !! converts to boolean. if empty string, false. if anything else, true.

  function loginHandler(token, loggedUser) {
    setToken(token);
    setUserLogged(loggedUser);
  }

  function logoutHandler() {
    setToken("goodbye");
    setUserLogged(user);
  }

  const contextValue = {
      userLogged,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
