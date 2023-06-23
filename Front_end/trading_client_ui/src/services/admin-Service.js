import { httpClient } from "./httpClient-interceptor-service";
import { USER_URI } from "../constant/user-uri-constant";
import { ACCOUNT_URI } from "../constant/account-uri-constant";
import { Password } from "@mui/icons-material";



class AdminService {
getAllClient() {
    return httpClient.get(USER_URI.GET_ALL_Clients);
}

subscribeClient(client) {
    return httpClient.post(USER_URI.SUBSCRIBE_CLIENT, client);
}
//Houssem PFE
//******user
getUserByEmail(email) {
    return httpClient.get(USER_URI.EXIST_BY_EMAIL+ `/${email}`);
}
getUserByUsername(username) {
    return httpClient.get(USER_URI.EXIST_BY_USERNAME+ `/${username}`);
}

updateUser(newuser){
    return httpClient.post(USER_URI.UPDATE_USER,newuser);
}

authenticate(username,password) {
    return httpClient.post(ACCOUNT_URI.AUTHENTIFICATE +`?password=`+`${password}`+'&username='+`${username}`);
}

getAllUsers(pageNo,pageSize) {
    return httpClient.get(USER_URI.GET_ALL_Users);
}
getAllUsersParLot(pageNo,pageSize) {
    return httpClient.get(USER_URI.GET_ALL_Users_PAR_LOT+ `/${pageNo}`+ `/${pageSize}`);
}

deleteUser(username) {
    return httpClient.delete(USER_URI.DELETE_USER+ `/${username}`);
}
//******user


//******tutorial


getAllTutorials(){
    return httpClient.get(USER_URI.GET_ALL_Tutorials);
}
getTutorial(id){
    return httpClient.get(USER_URI.GET_Tutorial+ `/${id}`);
}
updateTutorial(newTutorial){
    return httpClient.post(USER_URI.UPDATE_Tutorial,newTutorial);
}
deleteTutorial(id){
    return httpClient.delete(USER_URI.DELETE_Tutorial+ `/${id}`);
}
//******tutorial



//******order



getMyOrders(address){
    return httpClient.get('http://127.0.0.1:5001/sellOrders'+`/${address}`);
}

getOrderById(id){
    return httpClient.get('http://127.0.0.1:5001/order'+`/${id}`);
}

completeOrder(id){
    return httpClient.post('http://127.0.0.1:5001/completeOrder'+`/${id}`);
}

cancelOrder(id){
    return httpClient.post('http://127.0.0.1:5001/cancelOrderBySeller'+`/${id}`);
}

buyRequest(id,address){
    return httpClient.post('http://127.0.0.1:5001/requestBuy'+`/${id}`+`/${address}`);
}


cancelBuyRequest(id,address){
    return httpClient.post('http://127.0.0.1:5001/cancelOrderRequestByBuyer'+`/${id}`);
}
//******order


//******post


createPost(newpost){
    return httpClient.post(USER_URI.CREATE_POST,newpost);
}

getAllPosts(){
    return httpClient.get(USER_URI.GET_ALL_POSTS);
}
getPost(id){
    return httpClient.get(USER_URI.GET_POST+ `/${id}`);
}

deletePost(id){
    return httpClient.delete(USER_URI.DELETE_POST+ `/${id}`);
}

acceptPost(id){
    return httpClient.post(USER_URI.ACCEPT_POST+ `/${id}`);
}


//******post


//Houssem PFE




retrieveUserByLogin(login) {
    return httpClient.get(USER_URI.GET_USER_BY_LOGIN+ `/${login}`);
}

validate(userId , client) {
    return httpClient.post(ACCOUNT_URI.VALIDATE  + `/${userId}`, client);
}
hasApplication(login ) {
    return httpClient.get(ACCOUNT_URI.HAS_APPLICATION  + `/${login}`);
}
getClient(login ) {
    return httpClient.get(ACCOUNT_URI.GET_CLIENT  + `/${login}`);
}
register(user) {
    return httpClient.post(ACCOUNT_URI.REGISTER, user);
}
activateClient(id) {
    return httpClient.post(USER_URI.ACTIVATE_CLIENT, id);  
}
refuseClient(refuseParam) {
    return httpClient.post(USER_URI.REFUSE_CLIENT, refuseParam);
}
deleteClient(id) {
    return httpClient.post(ACCOUNT_URI.DELETE_CLIENT, id);
}
updateNewStorageForClient(client) {
    return httpClient.post(ACCOUNT_URI.UPDATE_NEW_STORAGE_FOR_CLIENT, client);
}
getUser(client) {
    return httpClient.post(USER_URI.USER,client);

}
getAllAuditFolder() {
    return httpClient.get(USER_URI.GET_ALL_AuditFolder);
}
getAllAuditDocument() {
    return httpClient.get(USER_URI.GET_ALL_AuditDocument);
}
getAuditDocumentByClient(client) {
    return httpClient.get(USER_URI.GET_AUDITDOCUMENT_BY_CLIENT+ `/${client}`);
}
getAuditFolderByAction(action) {
    return httpClient.get(USER_URI.GET_AUDITFOLDER_BY_ACTION+ `/${action}`);
}
getAuditFolderByUser(user) {
    return httpClient.get(USER_URI.GET_AUDITFOLDER_BY_USER+ `/${user}`);
}
getAuditFolderByDateAction(dateDebut,dateFin) {
    return httpClient.get(USER_URI.GET_AUDITFOLDER_BY_DATEACTION+ `/${dateDebut}/${dateFin}`);
}
getAuditDocumentByDateAction(dateDebut,dateFin)  {
    return httpClient.get(USER_URI.GET_DOCUMENT_BY_DATEACTION+ `/${dateDebut}/${dateFin}`);
}
////added by houssem

Search(searchRequest){
    return httpClient.post('http://localhost:9009/search/admin',searchRequest);

}
/*getNotDeletedDocuments(elasticdocuments,parent){
    return httpClient.post('http://127.0.0.1:9009/client/getNotDeletedDocument/'+parent,elasticdocuments);
}*/
getNotDeletedDocumentsAdmin(elasticdocuments,client){
    return httpClient.post('http://127.0.0.1:9009/client/getNotDeletedDocumentAdmin/'+client,elasticdocuments);
}

getElasticDocumentParLot(pageNo,elasticdocuments){
    return httpClient.post('http://127.0.0.1:9009/client/getElasticDocumentParLot'+`/${pageNo}`,elasticdocuments);
}
getDocumentById(documentId){
    return httpClient.get('http://127.0.0.1:9009/client/getDocumentById'+`/${documentId}`);
}

}

export default new AdminService()
