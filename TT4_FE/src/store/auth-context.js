import React, {useState} from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

// named export
export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token; // !! converts to boolean. if empty string, false. if anything else, true.

    function loginHandler(token) {
        setToken(token);
    };

    function logoutHandler() {
        setToken('goodbye');
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