import {BASE_URL} from './base-url-constant'

export const URI = {
    //Houssem PFE

    EXIST_BY_USERNAME : BASE_URL.apiUrl+"/users/getUserByUsername",


    //Houssem PFE



    GET_ALL_EXTENTION_FILE: BASE_URL.apiUrl+ "/extentionFile",
    SAVE_EXTENTION_FILE_BY_CLIENT_ID : BASE_URL.apiUrl+ "/clientExtentionFile/saveExtentionFileByClientId/",
    GET_EXTENTION_FILE_BY_CLIENT_ID: BASE_URL.apiUrl+ "/clientExtentionFile/getExtentionFileByClientId/",
    GET_EXTENTION_STATISTICS: BASE_URL.apiUrl+ "/client/getExtnsionStatistics/",
    GET_PARENT_STATISTICS: BASE_URL.apiUrl+ "/client/getParentFolderStatistics/",
    GET_PARENT_STATISTICS_STORAGE: BASE_URL.apiUrl+ "/client/getParentFolderStatisticsStorage/",
    GET_CLIENT_FROM_LOGIN: BASE_URL.apiUrl+ "/client/getClientFromLogin/",
    GET_PARENT_FOLDER_BY_CLIENT_ID: BASE_URL.apiUrl+ "/paramParentFolder/",
    SAVE_PARENT_FOLDER:  BASE_URL.apiUrl+ "/paramParentFolder/save",
    EDIT_PARENT_FOLDER: BASE_URL.apiUrl+ "/paramParentFolder/edit/",
    DESACTIVATE_PARENT_FOLDER:  BASE_URL.apiUrl+ "/paramParentFolder/desactivate",
    REACTIVATE_PARENT_FOLDER:  BASE_URL.apiUrl+ "/paramParentFolder/reactivate",
    DELETE_PARENT_FOLDER_BY_PARAM_FOLDER_COMPOSITE_ID: BASE_URL.apiUrl+ "/paramParentFolder",
    GET_LIST_PARENT_FOLDER_BY_PARENT_AND_LOGIN: BASE_URL.apiUrl+ "/file/getDocumentList/",
    GET_USER_UPLOAD_STATISTICS : BASE_URL.apiUrl+ "/client/getUserUploadStatistics/",
    GET_USER_DOWNLOAD_STATISTICS : BASE_URL.apiUrl+ "/client/getUserDownloadStatistics/",
    GET_DOWNLOAD_STATISTICS : BASE_URL.apiUrl+ "/client/getDownloadStatistics/",
    GET_MONTHLY_UPDATE_STATISTICS : BASE_URL.apiUrl+ "/client/getMonthlyUploadStat/",
    GET_MONTHLY_DOWNLOAD_STATISTICS : BASE_URL.apiUrl+ "/client/getMonthlyDownloadStat/",
    GET_FILES_FROM_FOLDER_BY_OWNER:BASE_URL.apiUrl+"/paramParentFolder/documentsFolder/",
    GET_FILES_FROM_FOLDER:BASE_URL.apiUrl+"/paramParentFolder/documentsIdFolder/",
    GET_FILE:BASE_URL.apiUrl+"/client/downloadFile/",
    DELETE_FILE:BASE_URL.apiUrl+"/client/deleteDocument/",
    GET_DELETED_FOLDER:BASE_URL.apiUrl+"/paramParentFolder/deleted/",
    BACKUP_FOLDER:BASE_URL.apiUrl+"/paramParentFolder/backUp",
    GET_OWNER_OF_FOLDER:BASE_URL.apiUrl+"/client/findOwnerOfFolder/",
    DELETE_FOLDER:BASE_URL.apiUrl+"/paramParentFolder/deleteFolder",
    RESTORE_FOLDER:BASE_URL.apiUrl+"/paramParentFolder/restoreFolder",
    
}
