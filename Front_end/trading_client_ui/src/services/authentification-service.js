import decode from 'jwt-decode';
import { loadAuthToken } from './localStorage-service';



const isTokenExpired = (token) => {
    try {
        const decoded = decode(token);

        if (decoded.exp < Date.now() / 1000) {
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return false;
    }
}


const initialProfile = {
    login: "",
    authority: "",
    hasApplication:false
}

export const getProfile = () => {

    const token = loadAuthToken();

    if (token) {

        const tokenDecoded = decode(token).sub
        //console.log(tokenDecoded)
        console.log(decode(token))
        const authorityDecoded = decode(token).auth[0].authority.split("_")
        console.log(authorityDecoded)
        const userAuthenticated = {
            login: tokenDecoded,
            authority: authorityDecoded[1]
        }

        return userAuthenticated
    }

    return initialProfile
}


export const isAuthenticated = () => {
    try {

        const token = loadAuthToken();

        if (token && !isTokenExpired(token)) {

            return true
        }

        return false

    }
    catch (err) {
        return false;
    }

}