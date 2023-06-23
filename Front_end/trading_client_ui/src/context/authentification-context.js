import React from 'react';

const AuthentificationContext = React.createContext({
    authenticated: false,
    profile: {
        login: "",
        authority: ""
    }
});


export default AuthentificationContext;