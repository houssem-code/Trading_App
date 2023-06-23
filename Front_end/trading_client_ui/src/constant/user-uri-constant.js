import {BASE_URL} from './base-url-constant'

export const USER_URI = {
   ACTIVATE_CLIENT : BASE_URL.apiUrl+ "/client/activateClient",
   GET_ALL_Clients: BASE_URL.apiUrl+ "/client/getAllClient",
   SUBSCRIBE_CLIENT : BASE_URL.apiUrl + "/client/subscribeClient",

   //Houssem PFE

   /****users ****/
   EXIST_BY_USERNAME : BASE_URL.apiUrl+"/users/getUserByUsername",
   EXIST_BY_EMAIL: BASE_URL.apiUrl+"/users/getUserByEmail",

   UPDATE_USER : BASE_URL.apiUrl+"/users/updateUser",
   GET_ALL_Users : BASE_URL.apiUrl+"/users/getAllUsers",
   GET_ALL_Users_PAR_LOT : BASE_URL.apiUrl+"/users/getAllUsers",
   DELETE_USER : BASE_URL.apiUrl+"/users/deleteUser",
   /****users ****/


   /****tutorials ****/
   GET_ALL_Tutorials : BASE_URL.apiUrl+"/tutorials/getAllTutorials",
   GET_Tutorial : BASE_URL.apiUrl+"/tutorials/getTutorialById",
   UPDATE_Tutorial : BASE_URL.apiUrl+"/tutorials/updateTutorial",
   DELETE_Tutorial : BASE_URL.apiUrl+"/tutorials/deleteTutorial",


   /****tutorials ****/
   /****posts ****/
   CREATE_POST  : BASE_URL.apiUrl+"/posts/createPost", 
   GET_ALL_POSTS : BASE_URL.apiUrl+"/posts/getAllPosts",
   GET_POST : BASE_URL.apiUrl+"/posts/getTutorialById",
   DELETE_POST : BASE_URL.apiUrl+"/posts/deletePost",
   ACCEPT_POST: BASE_URL.apiUrl+"/posts/acceptPost",


     /****posts ****/
   //Houssem PFE

   GET_USER_BY_LOGIN : BASE_URL.apiUrl+"/user/getUserByLogin",
   REFUSE_CLIENT:BASE_URL.apiUrl+ "/client/refuseClient",
   USER:BASE_URL.apiUrl+ "/client/getUser",
   GET_ALL_AuditFolder: BASE_URL.apiUrl+ "/auditfolder/getAllAuditFolder",
   GET_ALL_AuditDocument: BASE_URL.apiUrl+ "/auditdocument/getAllAuditDocument",
   GET_AUDITDOCUMENT_BY_CLIENT: BASE_URL.apiUrl+ "/auditdocument/getByClient",
   GET_AUDITFOLDER_BY_ACTION : BASE_URL.apiUrl+ "/auditfolder/getByAction",
   GET_AUDITFOLDER_BY_USER : BASE_URL.apiUrl+ "/auditfolder/getByutilisateur",
   GET_AUDITFOLDER_BY_DATEACTION : BASE_URL.apiUrl+ "/auditfolder/getByDateaction",
   GET_DOCUMENT_BY_DATEACTION : BASE_URL.apiUrl+ "/auditdocument/getByDateaction",





}