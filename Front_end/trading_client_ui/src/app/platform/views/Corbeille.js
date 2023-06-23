import * as React from 'react';
import { styled } from '@mui/system';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import clientService from '../../../services/client-service';
import { useEffect, useState,useContext } from 'react'
import { Pagination,Card } from 'antd';
import 'antd/dist/antd.css';
import { CheckCircleOutlined,CloseCircleOutlined } from '@ant-design/icons';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


import './Corbeille.css';



import LoadingButton from "@mui/lab/LoadingButton";


import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';



import AuthentificationContext from '../../../context/authentification-context';

import { Modal, Space, Button } from 'antd';
import { ClassNames } from '@emotion/react';
import { elementAcceptingRef } from '@mui/utils';

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
////fields choice
const names = [
  'Filename',
  'Extension',
  'Content',
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
    text-align: left;
    padding: 6px;
    font-size: smaller;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
  }
  `,
);


export default function Corbeille() {
  const authentificationContext = useContext(AuthentificationContext);
  const login = authentificationContext.profile.login;
  const [client,setClient] = useState({});
  const [fields,setFields] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [modal, contextHolder] = Modal.useModal();
  const [checkClick,setCheckClick]=useState(true);
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(3);
  const [corbeille,setCorbeille] = useState([]);
  const [filesDeletedParLot,setFilesDeletedParLot]=useState([]);
  //const [filesforCorbeille,setFilesforCorbeille] = useState([]);
  const [restoreCheck,setRestoreCheck] = useState(false);
  const [filesSelected,setFilesSelected] = useState([]);
  //const [checked, setChecked] = React.useState(true);
  const [filesSelectedNum,setFilesSelectedNum] = useState();

  const [resetSearch,setResetSearch] = useState(false);


  const [orderBy, setOrderBy] = React.useState("ASC");


  const handleChangeOrderBy = (event) => {
    setOrderBy(event.target.value);
    console.log(orderBy)
  };
  

  ////////////fieldChoice
  
  const [fieldList, setFieldList] = React.useState(["Content"]);

  ////restore/delete modal
  const { confirm } = Modal;

  /////button loading
  const [loading, setLoading] = React.useState(false);



 /////selectAll Hooks
 const isAllSelected =
corbeille.length > 0 && filesSelected.length === corbeille.length;





///////////////////////////useEffect
useEffect(()=>{
  getLogin()
  
},[])

useEffect(()=>{
  getAllFiles()
},[client,searchTerm,fieldList,restoreCheck,orderBy,resetSearch])


useEffect(() => {
  
  getElasticDocumentParLot(pageNumber-1,corbeille)
  setFilesSelectedNum(filesSelected.length)
}, [corbeille,pageNumber,filesSelected])



/////////////////////useEffect functions
const getLogin=() => {
  clientService.getClientFromLogin(login).then(resp => {
    setClient((resp.data))
    
    
    }).catch(err => {
      console.log(err)
    })
}


//////////////////////correction code
const getAllFiles=() => {
  if ( client.id != null){
     
    if(searchTerm !==""){
      setFields(fieldList)
      console.log(fields) 

    } else {
      setFields([])
      
    }
   clientService.Search(client.id,{"fields":fields,
   "searchTerm":searchTerm,"sortBy":"file.indexing_date","order":orderBy}).then(resp => {


        getDeletedDocument(resp.data)

      
       //setFilesforCorbeille(resp.data) 
            
     }).catch(err => {
       console.log(err)
     })


}}





const getDeletedDocument=(files) => {
  if ( client.id != null){
  clientService.getDeletedDocuments(client.id,files).then(resp => {
    setCorbeille(resp.data)
    
    }).catch(err => {
      console.log(err)
    })
  }
}


const getElasticDocumentParLot=(page,documents) => {
  clientService.getElasticDocumentParLot(page,documents).then(resp => {
    setFilesDeletedParLot(resp.data)

  }).catch(err => {
    console.log(err)
  })
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

  const restoreDocument=(documentId) => {
    clientService.restoreDocument(documentId)
    setRestoreCheck(!restoreCheck)

  
  var indexId = filesSelected.indexOf(+documentId)
  if (indexId !== -1) {
    filesSelected.splice(indexId, 1);
}
  //setFilesSelectedNum(filesSelected.length)
  console.log(filesSelected)




    //window.location.reload(false);
  }
  const deleteDocumentFromAll=(documentId) => {
    clientService.deleteDocumentFromAll(client.id,documentId).then(resp => {          
     
      window.location.reload(false);
        console.log("dakhlet")
      }).catch(err => {
        console.log(err)
      })


  }
  const restoreDocumentSelected=(documentsId) => {
    clientService.restoreDocumentSelected(documentsId)
    setRestoreCheck(!restoreCheck)
    setFilesSelected([])
    //setFilesSelectedNum(0)
  }

  function showRestoreConfirm(documentId,filename,extension) {
    confirm({
      title: 'Attention - restoration du document',
      icon: <CheckCircleOutlined style={{color: '#15DD25'}}/>,
      content: 'êtes-vous sûr de vouloir restaurer '+'"'+`${filename}`+"."+`${extension}`+'"'+" ?",
      okText: 'Restaurer',
      okType: 'success',
      cancelText: 'Annuler',
      onOk() {
        restoreDocument(documentId);
        
      },
      onCancel() {
      },
    });
  }


 



  

  function showDeleteFromAllConfirm(documentId,filename,extension) {
    confirm({
      title: 'Supprimer définitivement ?',
      icon: <CloseCircleOutlined style={{color: '#FF4242'}}/>,
      content: '"'+`${filename}`+"."+`${extension}`+'"'+' sera supprimé définitivement et vous ne pourrez pas le restaurer.',
      okText: 'Supprimer définitivement',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        deleteDocumentFromAll(documentId);
        
      },
      onCancel() {
      },
    });
  }

  function showDeleteSelectedFromAllConfirm(NumOfFilesSelected) {
    confirm({
      title: 'Supprimer définitivement ?',
      icon: <CloseCircleOutlined style={{color: '#FF4242'}}/>,
      content: 'ce(s) '+`${NumOfFilesSelected}`+' document(s) seront supprimés définitivement et vous ne pourrez pas les restaurer.',
      okText: 'Supprimer définitivement',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        deleteDocumentSelected(filesSelected);
        
      },
      onCancel() {
      },
    });
  }



  function showRestoreSelectedConfirm(NumOfFilesSelected) {
    confirm({
      title: 'Attention - restauration du document',
      icon: <CheckCircleOutlined style={{color: '#15DD25'}}/>,
      content: 'êtes-vous sûr de vouloir restaurer  ce(s) '+`${NumOfFilesSelected}`+' document(s) ?',
      okText: 'Restaurer',
      okType: 'success',
      cancelText: 'Annuler',
      onOk() {
        restoreDocumentSelected(filesSelected);
        
      },
      onCancel() {
      },
    });
  }




//////test


const handleCheckBoxChange = (id) => {
      
 
    if(!filesSelected.includes(+id)){       
      filesSelected.push(+id)
    }
    
   else {
    for( var i = 0; i < filesSelected.length; i++){ 

      if ( filesSelected[i] === +id) { 
  
        filesSelected.splice(i, 1); 
      }
  
  }
  }
  //console.log(filesSelected)
  setFilesSelectedNum(filesSelected.length)
  
};






const deleteDocumentSelected=(documentsId) => {
  clientService.deleteDocumentSelected(client.id,documentsId).then(resp => { 

     window.location.reload(false);
        
      }).catch(err => {
        console.log(err)
      })
}





const cleanTrash=(deletedDocuments) => {
  //loading button
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);
//cleaning trash
clientService.cleanTrash(client.id,deletedDocuments).then(resp => {

  window.location.reload(false);
        
      }).catch(err => {
        console.log(err)
      })
}



function showCleanTrashConfirm() {
    confirm({
      title: 'Supprimer définitivement ?',
      icon: <CloseCircleOutlined style={{color: '#FF4242'}}/>,
      content: 'Tous les éléments placès dans la corbeille seront supprimés définitivement et vous ne pourrez pas les restaurer.',
      okText: 'Supprimer définitivement',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        cleanTrash(corbeille);
        
      },
      onCancel() {
      },
    });
  }




  const selectAll = () => {
    const AllIds = [];
    for (var i = 0; i <corbeille.length; i++) {
      AllIds.push(+corbeille[i].elasticId);
      
    }
      setFilesSelected(filesSelected.length === corbeille.length ? [] : AllIds)

      
      
      
        //setFilesSelectedNum(filesSelected.length)
      
      
    }
    
    
  
    
  














  return (
    <div style={{marginLeft:'4.5em'}}>
    
    <Stack sx={{ width: '65%' }} spacing={4}>
      <Alert variant="outlined" severity="error" >
          
      Les éléments placés dans la corbeille sont définitivement supprimés au bout de 30 jours.
      </Alert>
    </Stack>
    
    <br/><br/>
    <Root sx={{ width: 1000, maxWidth: '100%' }} style={{marginLeft:'-0.45em'}}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
        
        <FindInPageIcon color="disabled"  sx={{ fontSize: 40}}/>
        <TextField id="input-with-sx" label="Search" variant="standard" onClick={() =>showDialog()}   value={searchTerm} onChange={e => searchFile(e)} />
        
        
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


    <div style={{paddingLeft: 70}}>
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



    <Box style={{paddingLeft: 88}}>
      <Box sx={{ "& > button": { m: 0 } }}>
        <LoadingButton
          style={{color:"red",marginTop:"-2px"}}
          textSizeSmall
          size="medium"
          color='error'
          onClick={() =>showCleanTrashConfirm()}
          loading={loading}
          loadingPosition="start"
          startIcon={<DeleteIcon />}
          variant="outlined"
        >
          vider la corbeille
        </LoadingButton>
      </Box>
    </Box>












        </Box><br/><br/>
        
    <Card bordered={false} style={{borderRadius: '10px',borderColor:'#000000'}} > 
      <table aria-label="custom pagination table" >
        <thead>
          <tr>           
            <th className='thTrash'     style={{textAlign:"center"}}><FormGroup>
                <FormControlLabel  control={<Checkbox size='small' sx={{mb:0,ml:1,color: "white","&.Mui-checked": {
            color: "white"
          }}} onChange={() =>selectAll()}
                  checked={isAllSelected} indeterminate={filesSelected.length > 0 && filesSelected.length < corbeille.length}
                  inputProps={{ 'aria-label': 'controlled' }} 

                  />} label={  <Typography sx={{ fontSize: 17, fontWeight: 'bold', ml: 18.60,mb:-1 }}>
                  Filename </Typography> } />
                
                </FormGroup></th>
            <th  className='thTrash'  style={{textAlign:"center"}}>Extension</th>
            <th  className='thTrash'  style={{textAlign:"center"}}>Date upload</th>
            <th  className='thTrash'  style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {filesDeletedParLot.map((row) => (
            <tr key={row.elasticId}>
              <td>
                <FormGroup  sx={{mb:0}} >
                <FormControlLabel control={<Checkbox sx={{mb:0.2}} size='small'  checked={filesSelected.indexOf(+row.elasticId) > -1}
                  onChange={(id) =>handleCheckBoxChange(row.elasticId)}
                  inputProps={{ 'aria-label': 'controlled' }} 

                  />} label={row.elasticFileDetails.filename} />
                </FormGroup>
              </td>
              <td style={{ width: 200 }} align="right">
                {row.elasticFileDetails.extension}
              </td>
              <td style={{ width: 200 }} align="right">
                {row.elasticFileDetails.indexing_date}
              </td>
              <td style={{ width: 150 }} >
              {/*<a class="fas fa-trash-restore" style={{color: '#15DD25',fontSize:'25px',marginLeft:'10px'}} ></a> */}
              
              <Tooltip  title="Restorer" ><a><RestorePageIcon   style={{color: '#15DD25',fontSize:'30px',marginLeft:'33px'}} onClick={(id,filename,extension) =>showRestoreConfirm(row.elasticId,row.elasticFileDetails.filename,row.elasticFileDetails.extension)}/></a></Tooltip>
              
              
              <Tooltip  title="Supprimer définitivement" ><a><DeleteForeverIcon   style={{color: '#FF4242',fontSize:'33px',marginLeft:'10px'}} onClick={(id,filename,extension) =>showDeleteFromAllConfirm(row.elasticId,row.elasticFileDetails.filename,row.elasticFileDetails.extension)}/></a></Tooltip>
              

              </td>
            </tr>
          ))}

          
        </tbody>
        <br/>
        
        

      </table>
      </Card>
      {/*<button onClick={() => console.log(filesSelected)}>test</button>
      <button onClick={() => console.log(filesSelectedNum)}>test</button>*/}
      <br/>
      {/*<button  onClick={()=>handleDeleteSelected()}>delete all</button>*/}
      <Pagination style={{textAlign:'center'}} defaultCurrent={3}  pageSize={pageSize} current={pageNumber} onChange={onChange} total={corbeille.length} />
      <br/><br/><br/>
      
      <Toolbar style={{minHeight:"10px"}}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(filesSelectedNum > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {filesSelectedNum > 0  ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {filesSelectedNum} document sélectionnés
        </Typography>
      ) : 
        <></>
      }
      {filesSelectedNum > 0 ? (
        <>
        <Tooltip title="Restore" style={{marginRight:'-6.3px'}}>
          <IconButton>
            
              <RestorePageIcon style={{fontSize:'30px'}}  onClick={(NumOfFilesSelected)=>showRestoreSelectedConfirm(filesSelectedNum)} />
            
          </IconButton>
          
        </Tooltip>
        
        <Tooltip title="Delete" style={{marginRight:'50px'}}>
          <IconButton>
            
             <DeleteForeverIcon style={{fontSize:'33px'}} onClick={(NumOfFilesSelected)=>showDeleteSelectedFromAllConfirm(filesSelectedNum)}/>
            
          </IconButton>
          
        </Tooltip>
        
        </>


      ) : (
        <></>
      )}
      </Toolbar>          
      
    
    
    </Root>
    </div>
    
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
  
  getAllFilesForCorbeille()
},[client,searchTerm,fieldList,restoreCheck,orderBy,resetSearch])*/

/*useEffect(() => {
  getDeletedDocument()
},[filesforCorbeille,restoreCheck,orderBy])*/



/*useEffect(() => {
  
  getElasticDocumentParLot(pageNumber-1,corbeille)
  setFilesSelectedNum(filesSelected.length)
}, [corbeille,pageNumber,restoreCheck,filesSelected,orderBy])*/

/*const getAllFilesForCorbeille=() => {
  if ( client.id != null){
     
    if(searchTerm !==""){
      setFields(fieldList)
      console.log(fields) 

    } else {
      setFields([])
      
    }
   clientService.Search(client.id,{"fields":fields,
   "searchTerm":searchTerm,"sortBy":"file.indexing_date","order":orderBy}).then(resp => {
      
       setFilesforCorbeille(resp.data) 
            
     }).catch(err => {
       console.log(err)
     })


}}*/
