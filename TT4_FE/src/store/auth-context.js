import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
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

    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const [userLogged, setUserLogged] = useState(user)
    const userIsLoggedIn = !!token; // !! converts to boolean. if empty string, false. if anything else, true.

    function loginHandler(token, loggedUser) {
        setToken(token);
        setUserLogged(loggedUser);
        console.log('logging IN context handled token is: ', token);
        localStorage.setItem('token', token); // store token in local storage to persist user login status
    }

    function logoutHandler() {
        console.log('logging out context handled: token set to null')
        setToken(null);
        localStorage.removeItem('token');
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
