import React, {useState} from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

// named export
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token; // !! converts to boolean. if empty string, false. if anything else, true.

    function loginHandler(token) {
        console.log('logging IN context handled token is: ', token);
        setToken(token);
        localStorage.setItem('token', token); // store token in local storage to persist user login status
    };

    function logoutHandler() {
        console.log('logging out context handled: token set to null')
        setToken(null);
        localStorage.removeItem('token');
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };


    
    return (<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>);
};

export default AuthContext;