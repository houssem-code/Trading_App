import * as React from 'react';
import { useEffect, useState,useContext } from 'react'

import { useHistory } from "react-router-dom";

import KeyIcon from '@mui/icons-material/Key';
import HistoryIcon from '@mui/icons-material/History';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import FolderIcon from '@mui/icons-material/Folder';

import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from '@mui/icons-material/Search';

import PageviewIcon from '@mui/icons-material/Pageview';

import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';

import LoadingButton from "@mui/lab/LoadingButton";

import Box from '@mui/material/Box';

import { CloseCircleOutlined } from '@ant-design/icons';

import DeleteIcon from '@mui/icons-material/Delete';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import SettingsIcon from '@mui/icons-material/Settings';

import clientService from '../../../services/client-service';

import AuthentificationContext from '../../../context/authentification-context';

import Toolbar from '@mui/material/Toolbar';
import Typography1 from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { alpha } from '@mui/material/styles';

import { Card,Typography,Modal } from 'antd';
export default function History() {

const authentificationContext = useContext(AuthentificationContext);
const login = authentificationContext.profile.login;

const history = useHistory();

const [modal, contextHolder] = Modal.useModal();

const [checkClick,setCheckClick]=useState(true);

const [loading, setLoading] = React.useState(false);

const [dateList,setDateList] = useState([]);
const [historySelected,setHistorySelected] = useState([]);
const [historySelectedNum,setHistorySelectedNum] = useState(0);

const { Title } = Typography;
////restore/delete modal
const { confirm } = Modal;

const [query, setQuery] = useState("");


const [field,setField] =useState("keyword");
const [keys,setKeys]= useState(["keyword"]);

useEffect(()=>{
      getHistoryPerDate();
},[])


const getHistoryPerDate=() => {
   var listOfObjects = [];
   clientService.getHistoryPerDate(login).then(resp => {
      var propertiesNames = Object.getOwnPropertyNames(resp.data);
      var propertiesValues =Object.values(resp.data);

      console.log(propertiesNames);
      
      
      for (let i = 0; i <propertiesNames.length; i++) {
         var singleObj={date:propertiesNames[i],objects:propertiesValues[i].reverse()}
         listOfObjects.push(singleObj);
         
       }
      setDateList(listOfObjects.reverse());

   }).catch(err => {
      console.log(err)
    })

}

const deleteHistoryById=(historyId)=> {
   clientService.deleteHistoryById(login,historyId).then(resp=> {

   window.location.reload(false);
   
   }).catch(err => {
      console.log(err)
    })

}

const handleCheckBoxChange = (id) => {
      
 
   if(!historySelected.includes(id)){       
      historySelected.push(id)
   }
   
  else {
   for( var i = 0; i < historySelected.length; i++){ 

     if ( historySelected[i] === id) { 
 
      historySelected.splice(i, 1); 
     }
 
 }
 }
 //console.log(filesSelected)
 setHistorySelectedNum(historySelected.length)
 
};


function showHistorySelectedFromAllConfirm() {
   confirm({
     title: 'Supprimer les éléments sélectionnés ?',
     icon: <CloseCircleOutlined style={{color: '#FF4242'}}/>,
     content: 'Voulez-vous vraiment supprimer ces éléments de votre historique ?',
     okText: 'Supprimer définitivement',
     okType: 'danger',
     cancelText: 'Annuler',
     onOk() {
       //deleteDocumentSelected(filesSelected);
       deleteHistorySelected(historySelected);
     },
     onCancel() {
     },
   });
 }

 const deleteHistorySelected=(historySelected)=>{
   clientService.deleteHistorySelected(login,historySelected).then(resp => {

      window.location.reload(false);

   }).catch(err => {
      console.log(err)
    })


 }
 function showHistoryPerDateConfirm(element) {
   confirm({
     title: "Supprimer l'historique de cette date ?",
     icon: <CloseCircleOutlined style={{color: '#FF4242'}}/>,
     content: "Voulez-vous vraiment supprimer l'historique de " + customFormatDate(element.date) + " ?",
     okText: 'Supprimer définitivement',
     okType: 'danger',
     cancelText: 'Annuler',
     onOk() {
       deleteHistoryPerDate(element);
     },
     onCancel() {
     },
   });
 }


 const deleteHistoryPerDate=(element)=> {
   var historiesId= [];
   for (let i=0;i <element.objects.length;i++){
      historiesId.push(element.objects[i].id)
   }
   deleteHistorySelected(historiesId);

 }
const cancelDeleteHistorySelected=() => {
      setHistorySelected([])
      setHistorySelectedNum(0)
}

const handleChangeField = (event) => {
  setField(event.target.value);
  setKeys([event.target.value]);
};

function showCleanHistoryConfirm() {
  confirm({
    title: "Supprimer historique ?",
    icon: <CloseCircleOutlined style={{color: '#FF4242'}}/>,
    content: "Voulez-vous vraiment effacer les données de votre historique ?",
    okText: 'Supprimer',
    okType: 'danger',
    cancelText: 'Annuler',
    onOk() {
      deleteAllHistory();
      
    },
    onCancel() {
    },
  });
}
const deleteAllHistory=()=> {

  for (let i=0;i <dateList.length;i++){
    deleteHistoryPerDate(dateList[i]);
 }

}

const handleSearchKeyword=(keyword) => {
  setField("keyword")
  setKeys(["keyword"])
  setQuery(keyword)

}






///////////////////////*********************date formatting !

///////////format from "yyyymmdd" => "yyyy/mm/dd"  (outil1)
function dateFormat(value, pattern) {
   var i = 0,
     date = value.toString();
   return pattern.replace(/#/g, _ => date[i++]);
 }
///////////(outil2)
function toTitleCase(str) {
   return str.replace(
       /\w\S*/g,
       function(txt) {
           return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
       }
   );
}
///////////final output !
function customFormatDate(StringDate) {
   var options = {year: 'numeric', month: 'long', day: 'numeric' };
   var opt_weekday = { weekday: 'long' };
   var weekday = toTitleCase(new Date(dateFormat(StringDate, '####/##/##')).toLocaleDateString("fr-FR", opt_weekday));


   var the_date = weekday + ", " + new Date(dateFormat(StringDate, '####/##/##')).toLocaleDateString("fr-FR", options)

   console.log(the_date);
   return the_date ;


}

///////////////////////*******************date formatting fin !



return(
<>

<Toolbar style={{minHeight:"10px"}}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(historySelectedNum > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {historySelectedNum > 0  ? (
      <>
         
         <Tooltip  title="Cancel" style={{marginRight:'20px'}}>
          <IconButton>
            
             <ClearIcon fontSize='small'  onClick={()=>cancelDeleteHistorySelected()} />
            
          </IconButton>
          </Tooltip>

        <Typography1
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {historySelectedNum} sélectionnés
        </Typography1>
        </>
      ) : 
        <></>
      }
      {historySelectedNum > 0 ? (
        
        <Tooltip  title="Delete" style={{marginRight:'37px'}}>
          <IconButton>
            
             <DeleteForeverIcon fontSize='small' style={{fontSize:'25px'}} onClick={()=>showHistorySelectedFromAllConfirm()} />
            
          </IconButton>
          
        </Tooltip>
          
      ) : (
        <></>
      )}
      </Toolbar>    

        <br/>
      
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{marginLeft:'28em'}}>

        <TextField  InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}  sx={{ width: "25ch" }}          size='small' id="outlined-basic" label="Search" variant="outlined" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        

        <FormControl sx={{ m: 0,ml:6, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Field</InputLabel>
        <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={field}
        label="Field"
        onChange={handleChangeField}
        >
        <MenuItem value={"keyword"}>keyword</MenuItem>
        <MenuItem value={"parent"}>folder</MenuItem>
        </Select>
        </FormControl>



        <Box style={{paddingLeft: 220}}>
      <Box sx={{ "& > button": { m: 0 } }}>
        <LoadingButton
          style={{color:"red",marginTop:"-2px"}}
          textSizeSmall
          size="medium"
          color='error'
          onClick={() =>showCleanHistoryConfirm()}
          loading={loading}
          loadingPosition="start"
          startIcon={<DeleteIcon />}
          variant="outlined"
        >
          effacer historique
          </LoadingButton>
        </Box>
        </Box>














        </Box>


 
<br/>
<br/>
{dateList.map((element)=>(

element.objects.filter((object)=>keys.some((key) => object[key].toLowerCase().includes(query))).length > 0 ?


   (<>
<Card title={<h5 style={{padding:'10px 0px 0px 0px',fontWeight:'600'}}> {customFormatDate(element.date)}</h5>} size='small' bordered={false} style={{borderRadius: '10px',borderColor:'#000000',width:700,marginLeft:'17em'}}
extra={<Tooltip  title="Delete" ><IconButton><DeleteIcon onClick={()=>showHistoryPerDateConfirm(element)}           /></IconButton></Tooltip>}
> 
<hr style={{
   color: '#A6A2A2', 
   backgroundColor: 'A6A2A2' ,marginTop:'-10px'    
}} />

<table>
      <thead>
      <th  style={{textAlign:"center"}}> 
      <Tooltip  title="Heure" > 
            <HistoryIcon /> 
      </Tooltip>
      
      </th> 
      <th  style={{textAlign:"center"}}> 
      <Tooltip  title="Mot clè" >
      <KeyIcon /> 
      </Tooltip>
      </th> 
      <th  style={{textAlign:"center"}}>
         <Tooltip  title="Dossier">
          <FolderIcon />
          </Tooltip>
           </th> 
      <th  style={{textAlign:"center"}}>
      <Tooltip  title="Actions">
          <SettingsIcon /> 
      </Tooltip>
          </th> 

      </thead>

      <tbody>
      {/*<button onClick={() =>console.log(dateList[0].objects.filter((object)=>object.keyword.toLowerCase().includes(query)))}>view data filtred</button>*/}


       
    {element.objects.filter((object)=>keys.some((key) => object[key].toLowerCase().includes(query))).map((object)=>(
      
   
      <tr>

         <td style={{ width: 100 }} align="left"><Checkbox sx={{mb:0.6}}    onChange={(id) =>handleCheckBoxChange(object.id)} checked={historySelected.indexOf(object.id) > -1} />{object.creation_hour}</td>
         {/*<td style={{ width: 25 }}  align="left"> <KeyIcon fontSize='small' style={{fontSize:'13px'}} /> </td>*/}
         <td style={{ width: 200}}  align="center">{object.keyword} </td>
         <td style={{ width: 200}}  align="center">{object.parent}</td>
         {/*<td style={{ width: 200}}  align="center"><i class="fas fa-ellipsis-v"></i></td>*/}
         <td style={{ width: 200}}  align="center">
           <Tooltip  title="Supprimer" ><IconButton><DeleteForeverIcon onClick={(historyId) =>deleteHistoryById(object.id)} /></IconButton></Tooltip>
           <Tooltip  title="Chercher ce mot clè dans mon historique " ><IconButton><YoutubeSearchedForIcon onClick={(keyword) => handleSearchKeyword(object.keyword)} /></IconButton></Tooltip>
           <Tooltip  title="Chercher ce mot clè dans mes dossiers" ><IconButton><PageviewIcon onClick={() =>history.push({ pathname: "/admin/files" ,state: { keyword: object.keyword,parent:object.parent }})} /></IconButton></Tooltip>
         </td>
         
      </tr>
    

      ))}

      </tbody>



</table>



</Card>


<br/>



</>):<></>



))}


{/*<button onClick={() =>console.log(dateList)}> view data</button>
<button onClick={() =>console.log(historySelected)}> view historySelected</button>
<button onClick={() =>console.log(historySelectedNum)}> view historySelectedNum</button>
<button onClick={() =>console.log(new Date("2022/05/26").toLocaleDateString('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric'
}))}>format date</button>


<button onClick={() =>console.log(new Date("2022/05/26"))}> test new</button>
<button onClick={() =>customFormatDate()}> test new</button>
<button onClick={() =>console.log(query)}> view query</button>
<button onClick={() =>console.log(dateList[0].objects.filter((object)=>object.keyword.toLowerCase().includes(query)))}>view data filtred</button>
<button onClick={() =>console.log(field)}> view field</button>*/}

</>

























)



}