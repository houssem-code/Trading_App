import {BASE_URL} from './base-url-constant'

export const ACCOUNT_URI = {
  
    REGISTER : BASE_URL.apiUrl+ "/users/signup",
    AUTHENTIFICATE : BASE_URL.apiUrl+ "/users/signin",
    VALIDATE :BASE_URL.apiUrl+ "/edm/validate",
    HAS_APPLICATION :BASE_URL.apiUrl+ "/edm/hasApplication",
    GET_CLIENT :BASE_URL.apiUrl+ "/edm/getClient",
    DELETE_CLIENT:BASE_URL.apiUrl+ "/edm/deleteClient",
    UPDATE_NEW_STORAGE_FOR_CLIENT:BASE_URL.apiUrl+ "/edm/updateNewValueStorageForClient",

}