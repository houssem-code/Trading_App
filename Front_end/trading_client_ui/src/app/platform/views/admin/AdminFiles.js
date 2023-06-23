import * as React from 'react';
import { styled } from '@mui/system';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useEffect, useState,useContext } from 'react'
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './AdminFiles.css';

import axios from 'axios';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import Notification from '../../../shared/notification/Notification'

import LoupeIcon from '@mui/icons-material/Loupe';

import Tooltip from '@mui/material/Tooltip';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

import { ExclamationCircleOutlined,FolderAddTwoTone,FolderOpenFilled } from '@ant-design/icons';




import 'antd/dist/antd.css';
import adminService from 'services/admin-Service';

import { Table,Button,Modal,Input, Form,InputNumber,Card,Row,Avatar } from 'antd';
import { Extension } from '@material-ui/icons';
import clientService from 'services/client-service';


import { SettingsSuggestTwoTone } from '@mui/icons-material';

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
    'Username',
    'Firstname',
    'Lastname',
  ];


 

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
      text-align: center;
      padding: 6px;
      font-size: smaller;
      
    }
  
    th {
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
      
    }
    `,
  );

  export default function Adminfiles() {
    //const [files, setFiles] = useState([]);
    const [fields,setFields] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [modal, contextHolder] = Modal.useModal();

    const [checkClick,setCheckClick]=useState(true);
    const [pageNumber,setPageNumber] = useState(1);
    const [pageSize,setPageSize] = useState(2);

    const [resetSearch,setResetSearch] = useState(false);

    const [filesNotDeleted,setFilesNotDeleted] = useState([]);
    const [filesNotDeletedParLot,setFilesNotDeletedParLot]=useState([]);
    const [Document,setDocument] = useState();
    const [user,setUser] = useState();

    const [listClientApplications,setListClientApplications] = useState([]);
    const [clientApp,setClientApp,] = useState("All Client");

    const [users,setUsers] = useState([]);
    const [usersParLot,setUsersParLot] = useState([]);
    ///modal consulter

    

  const [isModalDetailsVisible, setIsModalDetailsVisible] = useState(false);

  const { Meta } = Card;

  const handleCancelDetails = () => {
    setIsModalDetailsVisible(false);
    
  };

  const showModalDetails = (username) => {
    getUser(username)
    setIsModalDetailsVisible(true);
    
  };
 
  
  const getUser=(username) =>{
    adminService.getUserByUsername(username).then(resp => {
        setUser(resp.data)
    }).catch(err => {
      console.log(err)
    })
  }



    //////delete modal
    const { confirm } = Modal;


    ////////////fieldChoice
  
    const [fieldList, setFieldList] = React.useState(["Username"]);

 
    



    //////////////////useEffectgetAllFiles

    useEffect(() => {
      getAllUsers()

    },[])

    useEffect(() => {
      getAllUsersParLot()

    },[pageNumber])

const getAllUsers=()=>{
    adminService.getAllUsers().then(resp =>{
      setUsers(resp.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const getAllUsersParLot=()=>{
    adminService.getAllUsersParLot(pageNumber-1,pageSize).then(resp =>{
      setUsersParLot(resp.data)
    }).catch(err => {
      console.log(err)
    })
  }


    useEffect(()=>{
        getAllFiles()
      },[searchTerm,fieldList,resetSearch,clientApp])


      useEffect(() => {
  
        getElasticDocumentParLot(pageNumber-1,filesNotDeleted)
      
      }, [filesNotDeleted,pageNumber])



      const getAllClientApplications=() => {
        var listClientApps= []
        adminService.getAllClient().then(resp =>{
          resp.data.map(element => {
            listClientApps.push(element.application)
          })
          setListClientApplications(listClientApps)
        })

      }


      const getAllFiles=() => {
        
           
          if(searchTerm !==""){
            setFields(fieldList)
            console.log(fields) 
      
          } else {
            setFields([])
            
          }
         adminService.Search({"fields":fields,
         "searchTerm":searchTerm,}).then(resp => {

          getNotDeletedDocumentAdmin(resp.data,clientApp)
           
            
             //setFiles(resp.data) 
                  
           }).catch(err => {
             console.log(err)
           })
      
      
      }
      

      const getNotDeletedDocumentAdmin=(files,clientApp) => {
        adminService.getNotDeletedDocumentsAdmin(files,clientApp).then(resp => {
          setFilesNotDeleted(resp.data)
      
        }).catch(err => {
          console.log(err)
        })
      }



      const getElasticDocumentParLot=(page,documents) => {
        adminService.getElasticDocumentParLot(page,documents).then(resp => {
          setFilesNotDeletedParLot(resp.data)
      
        }).catch(err => {
          console.log(err)
        })
      }

/////////////////////onclick functions


const handleChange = (event) => {
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

function searchFile(e){

  setSearchTerm(e.target.value)
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

const handleChangeClientApplication = (event) => {
  setClientApp(event.target.value);
}



const deleteUser=(username) => {
  adminService.deleteUser(username).then(resp => {
    getAllUsers()
    getAllUsersParLot(pageNumber,pageSize)
    Notification('success', 'User Deleted', "")
  }).catch(err => {
    console.log(err)
  })
}


//Supprimer utilisateur
//function showDeleteConfirm(documentId,filename,extension) {
  function showDeleteConfirm(username){
  confirm({
    title: 'Supprimer utilisateur ?',
    icon: <ExclamationCircleOutlined style={{color: '#FF4242'}}/>,
    content :'User '+'"'+`${username}`+'"'+' will be deleted',
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk() {
      deleteUser(username);
      
    },
    onCancel() {
    },
  });
}







return (
  <Root sx={{ width: 1000, maxWidth: '100%' }} style={{marginLeft:'4em'}} >
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      
      {/*<FindInPageIcon color="disabled"  sx={{ fontSize: 40}}/>*/}
       {/*<TextField id="input-with-sx" label="Search" variant="standard" onClick={() =>showDialog()}   value={searchTerm} onChange={e => searchFile(e)} />*/}
      
      
      {/*<div style={{paddingLeft: 20}} >
    <FormControl sx={{ m: 0, width: 270 }}  >
      <InputLabel id="demo-multiple-checkbox-label" size="small">Field</InputLabel>
      <Select
        size="small"
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={fieldList}
        onChange={handleChange}
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
  </div>*/}

  {/****************************************Client*************************************/}

      </Box><br/><br/>
      
      <Card bordered={false} style={{borderRadius: '10px',borderColor:'#000000'}} >
    <table aria-label="custom pagination table">
      <thead>
        <tr>
          <th className='thAdmin' style={{textAlign:"center"}}>Username</th>            
          <th className='thAdmin' style={{textAlign:"center"}}>Firstname</th>
          <th className='thAdmin' style={{textAlign:"center"}}>Lastanme</th>
          <th className='thAdmin' style={{textAlign:"center"}}>Email</th>
          <th className='thAdmin' style={{textAlign:"center"}}>Action</th>
        </tr>
      </thead>
      <tbody>

      {usersParLot.map((row) => (
          <tr >
            <td  align="right">
              {/*row.elasticFileDetails.filename*/}<p>{row.username}</p>
            </td> 
            <td style={{ width: 200 }} align="right">
              {/*row.elasticFileDetails.extension*/}
              <p>{row.firstname}</p>
            </td>
            <td style={{ width: 200 }} align="right">
              {/*row.elasticFileDetails.indexing_date*/}
              <p>{row.lastname}</p>
            </td>
            <td style={{ width: 200 }} align="right">
              {/*row.elasticFileDetails.indexing_date*/}
              <p>{row.email}</p>
            </td>
            <td style={{textAlign:"center",width: 140}} >
            {/*<Tooltip  title="Voir plus d'informations"><a><LoupeIcon style={{color: '#84C8F2',fontSize:'27px',marginTop:'-11px'}}  onClick={() =>showModalDetails(+row.elasticId,row.client)} /></a></Tooltip>*/}
            <Tooltip  title="Voir plus d'informations"><a><LoupeIcon style={{color: '#84C8F2',fontSize:'27px',marginTop:'-11px'}}  onClick={() =>showModalDetails(row.username)} /></a></Tooltip>
            {/*<Tooltip  title="Placer dans la corbeille"><a><AutoDeleteIcon style={{color: '#FF4242',fontSize:'25px',marginLeft:'45px',marginTop:'-10px'}} onClick={(id,filename,extension) =>showDeleteConfirm(row.elasticId,row.elasticFileDetails.filename,row.elasticFileDetails.extension)} /></a></Tooltip>*/}
            <Tooltip  title="Supprimer l'utilisateur"><a><AutoDeleteIcon style={{color: '#FF4242',fontSize:'25px',marginLeft:'45px',marginTop:'-10px'}} onClick={() =>showDeleteConfirm(row.username)} /></a></Tooltip>
            </td>
          </tr>))}
          
          
            {/* ajouter '))}' ici et supprimer '}' apres filesNotDeletedParLot.map((row) => */}
      

        
      </tbody>
      <br/>
      
      

    </table>
    </Card>
{/* Modal */}


<Modal title="User consultation" visible={isModalDetailsVisible}  onCancel={handleCancelDetails}
      className="modal-info" okButtonProps={{ style: { display: 'none' } }}           
                            cancelButtonProps={{ style: { display: 'none' } }} style={{ top: 50}}
                  

                >


<div className="row ">
<div className="cl-6">
<div className="user-card user-infoS"  >
      {(user !== undefined) ?
      <>
            <h4 className="title-card" >User Informations</h4>
            
            <Meta
                    avatar={
                      <Avatar
                        icon="user"
                        shape="circle"
                        size={60}

                      />
                    }
                  />
            <br></br>
            <div className="user-card-item">
                <label for="name"> Username :</label>
                 {/*<span className="client_info">{" "}{Document.fileName} </span>*/}
                 <span className="client_info">{user.username}</span>
            </div>
            
            <div className="user-card-item">
                <label for="status"> Firstname :</label>
               {/*<span className="client_info">{" "}{Document.fileExtension}</span>*/}
               <span className="client_info">{user.firstname}</span>
            </div>
            
            <div className="user-card-item">
                <label for="status"> Lastname :</label>
                 {/*<span className="client_info">{" "}{Document.size} octets </span>*/}
                 <span className="client_info">{user.lastname} </span>
            </div>
            <div className="user-card-item">
                <label for="status"> Email :</label>
                 {/*<span className="client_info">{" "}{Document.size} octets </span>*/}
                 <span className="client_info">{user.email} </span>
            </div>
            
            </>:<></> }
        </div>
</div>


</div>

      </Modal>






















{/* Modal */}

    <br/>

     
    <Pagination style={{textAlign:'center'}} defaultCurrent={3}  pageSize={pageSize} current={pageNumber} onChange={onChange} total={users.length} />
    
  </Root>
  
);












  }