

export const ACCESS_TOKEN = 'accessToken';

export const loadAuthToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN);
};

export const saveAuthToken = authToken => {
    try {
        window.localStorage.setItem(ACCESS_TOKEN, authToken);
    } catch (e) { }
};

export const clearAuthToken = () => {
    try {
        window.localStorage.removeItem(ACCESS_TOKEN);
    } catch (e) { }
};
