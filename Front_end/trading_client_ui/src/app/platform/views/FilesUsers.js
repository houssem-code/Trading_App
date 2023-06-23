import * as React from 'react';
import { useLocation } from "react-router-dom";
import { styled } from '@mui/system';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import clientService from '../../../services/client-service';
import { useEffect, useState,useContext } from 'react'
import { Pagination,Card } from 'antd';
import 'antd/dist/antd.css';
import './FilesUsers.css';
import { ExclamationCircleOutlined,FolderAddTwoTone,FolderOpenFilled } from '@ant-design/icons';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

import Tooltip from '@mui/material/Tooltip';


import axios from 'axios';


import FileDownloadIcon from '@mui/icons-material/FileDownload';

import SearchIcon from '@mui/icons-material/Search';

import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


import AuthentificationContext from '../../../context/authentification-context';

import { Modal, Space } from 'antd';
import 'antd/dist/antd.css';




//////////field css

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
      
    },
  },
};


const names = [
  'Filename',
  'Extension',
  'Content',
];






























///////buton path modal

const ReachableContext = React.createContext();

const config = {
  title: 'Document Path',
  content: (
    <>
      
      <br />
      <FolderOpenFilled style={{ fontSize: '24px', color: '#E1EC21'}}/><span style={{marginLeft:'10px'}}> </span>
      <ReachableContext.Consumer>{name =>  name}</ReachableContext.Consumer>
    </>
  ),
};
///////buton path modal






const blue = {
  200: '#A5D8FF',
  400: '#3399FF',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 1rem;
    border-collapse: collapse;
    width: 100%;
    margin-left: 0.4em;
    
  }
  

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
    font-size: smaller;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
  }
  `,
);



export default function FilesUsers() {
  const authentificationContext = useContext(AuthentificationContext);
  const login = authentificationContext.profile.login;

  //////location
  const location = useLocation();

  const [client,setClient] = useState({});
  //const [files, setFiles] = useState([]);
  const [fields,setFields] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [modal, contextHolder] = Modal.useModal();
  const [path,setPath] = useState("");
  const [checkClick,setCheckClick]=useState(true);
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(3);
  const [deleteCheck,setDeleteCheck] = useState(false);
  const [filesNotDeleted,setFilesNotDeleted] = useState([]);
  const [filesNotDeletedParLot,setFilesNotDeletedParLot]=useState([]);

  const [orderBy, setOrderBy] = React.useState("DESC");

  const [parent, setParent] = React.useState("All Folder");
  const [listParentFolder,setListParentFolder] = useState([]);

  const [checkSearch,setCheckSearch] = useState(false);
  const [resetSearch,setResetSearch] = useState(false);

  //const [filesNotDeletedForStats,setFilesNotDeletedForStats] = useState([]);
  


  const handleChangeOrderBy = (event) => {
    setOrderBy(event.target.value);
    //console.log(orderBy)
  };




  //////delete modal
  const { confirm } = Modal;

 
  ////////////fieldChoice
  
  const [fieldList, setFieldList] = React.useState(["Content"]);





//////////////////useEffect

useEffect(()=>{
  getLogin()

},[])

//////location
useEffect(()=>{
  if( location.state != undefined){
  setSearchTerm(location.state.keyword)
  setParent(location.state.parent)
  }
  console.log(location)
},[location])


useEffect(()=>{
  getAllFiles()
  //getAllFolderByclient()
},[client,checkSearch,deleteCheck,orderBy,resetSearch])



useEffect(() => {
  
  getElasticDocumentParLot(pageNumber-1,filesNotDeleted)

}, [filesNotDeleted,pageNumber])

///stat
/*useEffect(()=>{
  incrementSearchedfiles()

},[checkSearch])*/








////////////////useEffect functions

const getLogin=() => {
  clientService.getClientFromLogin(login).then(resp => {

    getAllFolderByclient(resp.data)
    setClient((resp.data))
    
    
    }).catch(err => {
      console.log(err)
    })
}

////correction code
const getAllFiles=()=> {
  if ( client.id != null){
     
    if(searchTerm !==""){
      setFields(fieldList)
      //console.log(fields) 

    } else {
      setFields([])
      
    }
    
   clientService.Search(client.id,{"fields":fields,
   "searchTerm":searchTerm,"sortBy":"file.indexing_date","order":orderBy}).then(resp => {

    getNotDeletedDocument(resp.data,parent)

      //getElasticDocumentParLot(pageNumber-1,resp2.data)
      //console.log(filesNotDeletedParLot)
      }
      
       
    ).catch(err => {
      console.log(err)
    })   
     
    }
  }



const getNotDeletedDocument=(files,parent) => {
  clientService.getNotDeletedDocuments(files,parent).then(resp => {
    setFilesNotDeleted(resp.data)

  }).catch(err => {
    console.log(err)
  })
}


const getElasticDocumentParLot=(page,documents) => {
  clientService.getElasticDocumentParLot(page,documents).then(resp => {
    setFilesNotDeletedParLot(resp.data)

  }).catch(err => {
    console.log(err)
  })
}

////stat

const incrementSearchedfiles=() => {
  if(searchTerm !==""){
    setFields(fieldList)

    if(fields.length > 0){
    //console.log(fields) 


  clientService.Search(client.id,{"fields":fields,
   "searchTerm":searchTerm}).then(resp1 => {

    
    clientService.getNotDeletedDocuments(resp1.data,parent).then(resp2 => {
      var list =resp2.data
      for (let i = 0; i < list.length; i++) {
        incrementSearchedDocument(+list[i].elasticId)
      }
    
    //indexation du mot clè
    
    indexSearchTerm({name:searchTerm,parent:parent,creation_date:new Date().toLocaleDateString('en-GB').split('/').reverse().join('')},client.id)
    
    //indexation du history
    //const todayDate =new Date().toLocaleDateString('en-GB').split('/').reverse().join('')
    var min = ('0'+new Date().getMinutes()).slice(-2);
    var hour = ("0" + new Date().getHours()).slice(-2);
    indexHistory({id:Date.now()-1653484198000,keyword:searchTerm,creation_date:new Date().toLocaleDateString('en-GB').split('/').reverse().join(''),creation_hour: hour+':'+min,parent:parent},client.id)

    })
       
            
     }
     
     ).catch(err => {
       console.log(err)
     })



    } 
}
}


const incrementSearchedDocument=(documentId) => {
  clientService.incrementSearchedDocument(documentId).then(resp => {

      }).catch(err => {
      console.log(err)
    })   

}

const indexSearchTerm=(searchTerm,clientId)=>{

  clientService.indexSearchTerm(searchTerm,clientId)

}

const indexHistory=(history,clientId)=> {

  clientService.indexHistory(history,clientId)
}







const getAllFolderByclient=(client)=> {
  if ( client.id != null){
  var listParent = []
  clientService.findParentFolderByClientId(client.id).then(resp => {
    console.log("hhh")
    resp.data.map(element => {
      console.log(element)
      listParent.push(element.paramParentFolderCompositeID.parent)
    })
    setListParentFolder(listParent);

  })
  }
}

























/////////////////////onclick functions


  const handleChangeFields = (event) => {
    const {
      target: { value },
      
    } = event;
    
    setFields(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    //setFields(tab);


    setFieldList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );


    /////fieldsList
    if (searchTerm == ""){
      setFields([])
    }
    
  };

 
  const searchFile=(e)=>{

    setSearchTerm(e.target.value)
    setFields(fieldList)
    if(e.target.value ==""){
      setFields([])
      setResetSearch(!resetSearch)
    }

  }


  const showDialog =()=>{
    
    if (checkClick == true) {
      

    }
    setCheckClick(false)
  }
 const onChange = page=>{
  
  setPageNumber(page)

  }


  function getPath(documentId) {
    clientService.getPathFromDocumentId(documentId).then(resp=> {
      setPath(resp.data)
    }).catch(err => {
      console.log(err)
    })
  }


  const deleteDocument=(documentId) => {
    clientService.deleteDocument(documentId)
    setDeleteCheck(!deleteCheck)
  }


  function showDeleteConfirm(documentId,filename,extension) {
    confirm({
      title: 'Placer dans la corbeille ?',
      icon: <ExclamationCircleOutlined style={{color: '#FF4242'}}/>,
      content: '"'+`${filename}`+"."+`${extension}`+'"'+' sera définitivement supprimé au bout de 30 jours.',
      okText: 'Placer dans la corbeille',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        deleteDocument(documentId);
        
      },
      onCancel() {
      },
    });
  }


  












/////download document

  const getFileToDownload = (documentId,filename,extension)=> {
    return axios.get('http://127.0.0.1:9009/client/downloadFile'+`/${documentId}`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then (response => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `${filename}`+"."+`${extension}`
      link.click()
  })
  }


  const consultDocument = (documentId)=> {
    return axios.get('http://127.0.0.1:9009/client/viewPdf'+`/${documentId}`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then (response => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      //link.download = `${filename}`+"."+`${extension}`
      link.click()
      
  })
  }




const doTheSearch=()=>{
  incrementSearchedfiles()
  setCheckSearch(!checkSearch)
  
}

//////////////////////////folder


const handleChangeFolder = (event) => {
  setParent(event.target.value);
};














  return (
    <Root sx={{ width: 1000, maxWidth: '100%' }} style={{marginLeft:'4em'}} >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        
        <FindInPageIcon color="disabled"  sx={{ fontSize: 40}}/>
        <TextField sx={{ width: "18ch" }} id="input-with-sx" label="Search" variant="standard" onClick={() =>showDialog()}   value={searchTerm} onChange={e => searchFile(e)} />
        <IconButton style={{marginLeft:'-25px'}} size="large" aria-label="search" color="inherit">
            <SearchIcon sx={{margin: -1.15}} style={{color:'#696969'}} color="disabled" onClick={() =>doTheSearch()} />
        </IconButton>
        
        {/***************************************FIELDS************************************/}
        <div style={{paddingLeft: 20}} >
      <FormControl sx={{ m: 0, width: 270 }}  >
        <InputLabel id="demo-multiple-checkbox-label" size="small">Field</InputLabel>
        <Select
          size="small"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={fieldList}
          onChange={handleChangeFields}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={fieldList.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>

  {/****************************************FOLDER*************************************/}

  <div style={{paddingLeft: 20}}>
      <FormControl className='folderForm' sx={{ m: 0, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-autowidth-label" size="small">Folder</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={parent}
          onChange={handleChangeFolder}
          label="Folder"
          size="small"
          
        >

          <MenuItem value="All Folder">
            <em>All Folder</em>
          </MenuItem>
          {listParentFolder.map((name) => (    
              <MenuItem value={name}>{name}</MenuItem>
            ))}
        </Select>
      </FormControl>
          </div>


    {/****************************************ASC-DESC*************************************/}
    <div style={{paddingLeft: 252}}>
      <FormControl sx={{ m: 0, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label" size="small">
          OrderByDate
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={orderBy}
          onChange={handleChangeOrderBy}
          autoWidth
          label="OrderByDate"
          size="small"
        >
          <MenuItem value={"ASC"}>ASC</MenuItem>
          <MenuItem value={"DESC"}>DESC</MenuItem>
        </Select>
      </FormControl>
    </div>

        
        </Box><br/><br/>
        
        <Card bordered={false} style={{borderRadius: '10px',borderColor:'#000000'}} > 
        
        <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th className='thClient' style={{textAlign:"center"}}>Filename</th>            
            <th className='thClient' style={{textAlign:"center"}}>Extension</th>
            <th className='thClient' style={{textAlign:"center"}}>Date upload</th>
            <th className='thClient' style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {filesNotDeletedParLot.map((row) => (
            <tr key={row.elasticId}>
              <td  align="right">
                {row.elasticFileDetails.filename}
              </td> 
              <td style={{ width: 200 }} align="right">
                {row.elasticFileDetails.extension}
              </td>
              <td style={{ width: 200 }} align="right">
                {row.elasticFileDetails.indexing_date}
              </td>
              <td style={{ width: 220 }} >
                
              <ReachableContext.Provider value={path}>
              <Space>
              <a class="fa fa-folder-open"
              style={{color: '#E1EC21',fontSize:'20px',marginLeft:'10px'}}
                onClick={() => {
                modal.info(config);
                getPath(row.elasticId);
                }}
                >
                
                </a>     
                </Space>     
                {contextHolder}     
                </ReachableContext.Provider>

                <a  class="fa fa-eye" onClick={()=>consultDocument(+row.elasticId)}  style={{color: '#468AEE',fontSize:'20px',marginLeft:'40px'}} ></a>



                {/* <a class="fa fa-trash" style={{color: '#FF4242',fontSize:'25px',marginLeft:'45px'}} onClick={(a) =>deleteDocument(row.elasticId)}></a> */}
                
                <Tooltip  title="Placer dans la corbeille"><a><AutoDeleteIcon style={{color: '#FF4242',fontSize:'25px',marginLeft:'45px',marginTop:'-10px'}} onClick={(id,filename,extension) =>showDeleteConfirm(row.elasticId,row.elasticFileDetails.filename,row.elasticFileDetails.extension)} /></a></Tooltip>
                                                                                                         
                <Tooltip  title="Telecharger"><a><FileDownloadIcon style={{color: '#15DD25',fontSize:'25px',marginTop:'-10px',marginLeft:'21px'}} onClick={() =>getFileToDownload(row.elasticId,row.elasticFileDetails.filename,row.elasticFileDetails.extension)} /></a></Tooltip>
              </td>
            </tr>
          ))}

          
        </tbody>
        <br/>
        
        

      </table>
      </Card>
      <br/>
      
      <Pagination style={{textAlign:'center'}} defaultCurrent={3}  pageSize={pageSize} current={pageNumber} onChange={onChange} total={filesNotDeleted.length} />
    </Root>
    
  );
}



/////////////ancien raisonnement


/*useEffect(()=>{
  initialFieldList()
},[searchTerm])*/



/*const initialFieldList=() =>{
  if(searchTerm == ""){
    setFields([])
    setResetSearch(!resetSearch)

  }
}*/

/*useEffect(()=>{
  getAllFiles()
},[client,checkSearch,deleteCheck,orderBy,resetSearch])*/


/*useEffect(() => {
  getNotDeletedDocument()
},[files,deleteCheck,orderBy])*/


/*useEffect(() => {
  
  getElasticDocumentParLot(pageNumber-1,filesNotDeleted)

}, [filesNotDeleted,pageNumber,deleteCheck,orderBy])*/


/*const getAllFiles=() => {
  if ( client.id != null){
     
    if(searchTerm !==""){
      setFields(fieldList)
      //console.log(fields) 

    } else {
      setFields([])
      
    }
   clientService.Search(client.id,{"fields":fields,
   "searchTerm":searchTerm,"sortBy":"file.indexing_date","order":orderBy}).then(resp => {
      
       setFiles(resp.data) 
            
     }).catch(err => {
       console.log(err)
     })


}}*/