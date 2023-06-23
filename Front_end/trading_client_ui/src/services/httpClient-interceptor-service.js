import axios from 'axios';
import {BASE_URL} from '../constant/base-url-constant'
import { loadAuthToken } from './localStorage-service'



export const httpClient = axios.create({
  baseURL: BASE_URL.apiUrl,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
 
});



httpClient.interceptors.request.use(config => {

  let accessToken = loadAuthToken();


  if (accessToken) {

    config.headers['Authorization'] = `Talan ${accessToken}`;
    //config.headers['Authorization'] = "secret-key"

  }

  return config;
}, error => {

  return Promise.reject(error);
});

