import React, {createContext, useContext, useEffect, useState } from 'react'; 
import {useNavigate} from 'react-router-dom';

import Auth from './auth';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

    const [userData, setUserData] = useState(Auth.getProfile() || {});

    const redirectTo = (url = null) => {
        if (url) {
            navigate(url);
        }
    }

    const login = (token, redirectUrl) => {
        Auth.login(token);
        setLoggedIn(true);
        setUserData(Auth.getProfile());
        redirectTo(redirectUrl);
    }

    const logout = (redirectUrl) => {
        Auth.logout();
        setLoggedIn(false);
        setUserData({});
        redirectTo(redirectUrl);
    }

    return (
        <AuthContext.Provider 
        value={{loggedIn, login, logout, userData}}
        >
            {children}
        </AuthContext.Provider>
    )
}