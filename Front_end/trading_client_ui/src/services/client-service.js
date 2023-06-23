import { httpClient } from "./httpClient-interceptor-service";
import { URI } from "../constant/uri";

class ClientService {
    getAllExtentionFile() {
        return httpClient.get(URI.GET_ALL_EXTENTION_FILE);
    }
    saveExtentionFileByClientId(clientId,extentionFileList) {
        return httpClient.post(URI.SAVE_EXTENTION_FILE_BY_CLIENT_ID+clientId,extentionFileList);
    }
    getExtentionFileByClientId(clientId) {
        return httpClient.get(URI.GET_EXTENTION_FILE_BY_CLIENT_ID+clientId);
    }
    getExtensionStatistics(login) {
        return httpClient.get(URI.GET_EXTENTION_STATISTICS+login);
    }

    getParentStatistics(login) {
        return httpClient.get(URI.GET_PARENT_STATISTICS+login);
    }

    getParentStatisticsStorage(login) {
        return httpClient.get(URI.GET_PARENT_STATISTICS_STORAGE+login);
    }

    getUserUploadStatistics(login) {
        return httpClient.get(URI.GET_USER_UPLOAD_STATISTICS+login);
    }  
    getUserDownloadStatistics(login) {
        return httpClient.get(URI.GET_USER_DOWNLOAD_STATISTICS+login);
    }
    getClientFromLogin(login) {
        return httpClient.get(URI.GET_CLIENT_FROM_LOGIN+login);
    }
    
    getDownloadStatistics(login) {
        return httpClient.get(URI.GET_DOWNLOAD_STATISTICS+login);
    }

    saveNewParentFolder(parentFolder){
        return httpClient.post(URI.SAVE_PARENT_FOLDER,parentFolder);
    }
    editParentFolder(parentFolder,parent,acceptMultipleFile1){
        return httpClient.put(URI.EDIT_PARENT_FOLDER+parent+'/'+acceptMultipleFile1,parentFolder);
    }
    desactivateParentFolder(parentFolder){
        return httpClient.post(URI.DESACTIVATE_PARENT_FOLDER,parentFolder);
    }
    deleteParentFolder(parentFolder){
        return httpClient.post(URI.DELETE_FOLDER,parentFolder);
    }

    reactivateParentFolder(parentFolder){
        return httpClient.post(URI.REACTIVATE_PARENT_FOLDER,parentFolder);
    }
    findParentFolderByClientId(clientId){
        return httpClient.get(URI.GET_PARENT_FOLDER_BY_CLIENT_ID+clientId);
    }
    deleteParentFolderByParamFolderCompositId(param){
        return httpClient.post(URI.DELETE_PARENT_FOLDER_BY_PARAM_FOLDER_COMPOSITE_ID,param);
    }
    getDocumentListByParentFolderAndUser(parent,login){
        return httpClient.get(URI.GET_LIST_PARENT_FOLDER_BY_PARENT_AND_LOGIN+parent+'/'+login);
    }
    getMonthlyUploadStat(login) {
        return httpClient.get(URI.GET_MONTHLY_UPDATE_STATISTICS+login);
    }
    getMonthlyDownloadStat(login) {
        return httpClient.get(URI.GET_MONTHLY_DOWNLOAD_STATISTICS+login);
    }
    getFilesFromFolderByOwner(parent,IdClient,owner){
        return httpClient.get(URI.GET_FILES_FROM_FOLDER_BY_OWNER+parent+'/'+IdClient+'/'+owner);
    }
    getFilesFromFolder(parent,IdClient){
        return httpClient.get(URI.GET_FILES_FROM_FOLDER+parent+'/'+IdClient); 
    }

    getFile(IdClient) {
        return httpClient.get(URI.GET_FILE+IdClient,{ responseType: 'arraybuffer' });
    }
    deleteFile(idFile){
        return httpClient.delete(URI.DELETE_FILE+idFile);

    }
    getDeleteFolder(clientId){
        return httpClient.get(URI.GET_DELETED_FOLDER+clientId);

    }
    backUpFolder(client, file){
        return httpClient.post(URI.BACKUP_FOLDER+`/${client}`, file);
    }
    getOwnerOfFolder(parent){

        return httpClient.get(URI.GET_OWNER_OF_FOLDER+parent);

    }



/*     deleteParentFolder(parentFolder){
        return httpClient.post(URI.DELETE_FOLDER,parentFolder);
    } */

    restoreFolder(parentFolder){
        return httpClient.post(URI.RESTORE_FOLDER,parentFolder);

    }

    ////added by Houssem
    Search(clientId,searchRequest){
        return httpClient.post('http://localhost:9009/search'+`/${clientId}`,searchRequest);

    }
    getPathFromDocumentId(documentId){
        return httpClient.get('http://localhost:9009/client/PathFromDocument'+`/${documentId}`);

    }
    deleteDocumentFromAll(clientId,documentId){
    
        return httpClient.delete('http://127.0.0.1:9009/client/deleteDocumentByIdFromAll'+`/${clientId}`+`/${documentId}`);
    }
    getDocumentById(documentId){
        return httpClient.get('http://127.0.0.1:9009/client/getDocumentById'+`/${documentId}`);
    }
    getDeletedDocuments(clientId,elasticdocuments){
        return httpClient.post('http://127.0.0.1:9009/client/getDeletedDocument'+`/${clientId}`,elasticdocuments);
    }
    getNotDeletedDocuments(elasticdocuments,parent){
        return httpClient.post('http://127.0.0.1:9009/client/getNotDeletedDocument/'+parent,elasticdocuments);
    }
    deleteDocument(documentId){
        return httpClient.put('http://127.0.0.1:9009/client/deleteDocument'+`/${documentId}`);
    }
    getElasticDocumentParLot(pageNo,elasticdocuments){
        return httpClient.post('http://127.0.0.1:9009/client/getElasticDocumentParLot'+`/${pageNo}`,elasticdocuments);
    }
    restoreDocument(documentId){
        return httpClient.put('http://127.0.0.1:9009/client/restoreDocument'+`/${documentId}`);
    }
    deleteDocumentSelected(clientId,docoumentsId){
        return httpClient.post('http://localhost:9009/client/deleteDocumentSelected'+`/${clientId}`,docoumentsId);
    }
    restoreDocumentSelected(docoumentsId){
        return httpClient.put('http://127.0.0.1:9009/client/restoreDocumentSelected',docoumentsId);
    }
    cleanTrash(clientId,deletedDocuments){
        return httpClient.post('http://127.0.0.1:9009/client/cleanTrash'+`/${clientId}`,deletedDocuments);
    }
    getClientById(clientId){
        return httpClient.get('http://127.0.0.1:9009/client/getClientById'+`/${clientId}`);
    }

    getMostSearchedFiles(login,parent) {
        return httpClient.get('http://127.0.0.1:9009/client/getMostSearchedDocument/'+login+'/'+parent);
        
    }
    getLessSearchedFiles(login,parent) {
        return httpClient.get('http://127.0.0.1:9009/client/getLessSearchedDocument/'+login+'/'+parent);
        
    }
    incrementSearchedDocument(documentId){
        return httpClient.put('http://127.0.0.1:9009/client/incrementSearchedDocument'+`/${documentId}`);
    }
    
    indexSearchTerm(searchTerm,clientId){
        return httpClient.post('http://127.0.0.1:9009/keyword/index'+`/${clientId}`,searchTerm);
    }
    getMostUsedKeyword(login,folder,startDate,endDate){
        return  httpClient.get('http://127.0.0.1:9009/keyword/getMostUsedKeyword'+`/${login}`+`/${folder}`+'/'+startDate+'/'+endDate);
    }
    indexHistory(history,clientId){
        return httpClient.post('http://127.0.0.1:9009/history/index'+`/${clientId}`,history);
    }
    getHistoryPerDate(login){
        return httpClient.get('http://127.0.0.1:9009/history/getHistoryPerDate/'+login);
    
    }
    deleteHistoryById(login,historyId){
        return httpClient.delete('http://127.0.0.1:9009/history/deleteHistoryById/'+login+'/'+historyId);
    }
    deleteHistorySelected(login,historiesId){

        return httpClient.post('http://127.0.0.1:9009/history/deleteHistorySelected/'+login,historiesId);
    }


    
}

export default new ClientService()
