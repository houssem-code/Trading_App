import React, { useEffect, useState, useContext } from "react";


import { Select,Space,Button } from 'antd';

import { DatePicker,Typography,Row,Col } from 'antd';



import { SyncOutlined,PieChartOutlined,SearchOutlined } from '@ant-design/icons';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

import AuthentificationContext from '../../../../../context/authentification-context';

import ClientService from "../../../../../services/client-service";

import moment from 'moment';

export default function ClientSearchStatistics() {


  const authentificationContext = useContext(AuthentificationContext);
  const login = authentificationContext.profile.login;


  const [client,setClient] = useState({});
////houssem

const { Text, Link, Title } = Typography;
const dateFormat = "YYYY-MM-DD";

var dateFormatter = Intl.DateTimeFormat('sv-SE');

const [startDate, setStartDate] = useState("2015-01-01");
const [endDate, setEndDate] = useState(dateFormatter.format(new Date()));

const [filesSearched, setFilesSearched] = useState([]);
const [listParentFolder,setListParentFolder] = useState([]);
const [folder,setFolder]= useState("All Folder");

    
/////cyrine

const [searchedFiles, setSearchedFiles] = useState([]);  
const [parent,setParent]= useState("All Folder");

const [checkMost,setCheckMost] = useState(true);
const [checkLess,setCheckLess] = useState(false);


//////useEffect
useEffect(()=>{
  getLogin()
  getMostSearchedFiles(parent);
  getMostUsedKeyword(folder,startDate,endDate)
  
},[])


//mmost
/*useEffect(()=>{
  getMostSearchedFiles();
  
},[parent1])*/


//less
/*useEffect(()=>{

  getLessSearchedFiles(parent2);

},[parent2])*/



/*useEffect(()=>{
  
  getMostUsedKeyword(folder);
},[folder])*/




//////useEffect
/*useEffect(()=>{
  
  getAllFolderByclient(client);
},[client])*/

////// functions


const getLogin=() => {
  ClientService.getClientFromLogin(login).then(resp => {

    getAllFolderByclient(resp.data)
    setClient((resp.data))
    
    
    }).catch(err => {
      console.log(err)
    })
}













const getMostSearchedFiles = (parent) => {
  var listOfObjects = [];
  ClientService.getMostSearchedFiles(login,parent)   
    .then((resp) => {
      
      resp.data.map((item) => {
        var singleObj = {name:item[0],y:item[1]};
        listOfObjects.push(singleObj);
        
      });
      setSearchedFiles(listOfObjects);
    })
    .catch((err) => {
      console.log(err);
    });
};


const getLessSearchedFiles = (parent) => {
  

  //console.log("dakhlet fel Less")
  
  var listOfObjects = [];
  ClientService.getLessSearchedFiles(login,parent)   
    .then((resp) => {
      
      resp.data.map((item) => {
        var singleObj = {name:item[0],y:item[1]};
        listOfObjects.push(singleObj);
        
      });
      setSearchedFiles(listOfObjects);
    })
    .catch((err) => {
      console.log(err);
    });
};

/////////////////////////keyword used
const getMostUsedKeyword=(folder,startDate,endDate)=> {

  var listOfObjects = [];
  ClientService.getMostUsedKeyword(login,folder,startDate,endDate).then(resp => {
    var propertiesNames = Object.getOwnPropertyNames(resp.data);
    var propertiesValues =Object.values(resp.data);
    
    for (let i = 0; i < 3; i++) {
      var singleObj={name:propertiesNames[i],y:propertiesValues[i]}
      listOfObjects.push(singleObj);
      
    }
    setFilesSearched(listOfObjects);

  }).catch(err => {
  console.log(err)
})   

  
}

const getAllFolderByclient=(client)=> {
  if ( client.id != null){
  var listParent = []
  ClientService.findParentFolderByClientId(client.id).then(resp => {
    console.log("hhh")
    resp.data.map(element => {
      console.log(element)
      listParent.push(element.paramParentFolderCompositeID.parent)
    })
    setListParentFolder(listParent);

  })
  }
}


const handleChangeParentFolder=(value)=> {
  getMostUsedKeyword(value,startDate,endDate)
  setFolder(value);
}




const handleChangeParentFolder1=(value)=> {
  if(checkMost === true){
    
    getMostSearchedFiles(value)
    setParent(value);

  }else {
    
    getLessSearchedFiles(value)
    setParent(value);
  }



}











    
  

    const options = {
    
      credits: {
        enabled: false
    },
      chart : {
        type : 'column'
      },
      title: {
        text: 'les mots clès les plus utilisès'
      },
      colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        legend: {
      enabled: false
    },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: "Nombre d'occurence "
        }},
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              
            }
          }
        },
      series: [{
        name : "nombre d'usage ",
        colorByPoint: true,
        data: filesSearched
      }]
    }















    


    







{/*houssemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}


      




      const optionsDownload = {
        credits: {
          enabled: false
      },
        chart : {
          type : 'bar'
        },
        title: {
          text: 'Nombre de recherche par Document'
        },
        colors: ["#7cb5ec", "#AA4643", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],
          legend: {
        enabled: false
      },
        xAxis: {
          type: 'category'
          
        },
        yAxis: {
          allowDecimals: false,
          title: {
            text: 'Nombre de recherche'
          }
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{y}'
              }
            }
          },
          options:{ 
            scales: {
              yAxes: [{
                ticks: {
                  stepSize: 1
                }
              }]
            }
          },
        series: [{
          name : "nombre de recherche",
          colorByPoint: true,
          data: searchedFiles,
        }]
      }



    const handleChangeSearchedDocuments=(value)=> {
      if ( value ==="mostSearched") {
        getMostSearchedFiles(parent); 
        setCheckMost(true)
        setCheckLess(false)
      }
      else {

        getLessSearchedFiles(parent)
        setCheckLess(true) 
        setCheckMost(false)
      } 
    }

    
    

      const handleStartDate=(date)=> {
        if (date != null) {
          var myCurrentDate = new Date(date);
          var dateFormatter = Intl.DateTimeFormat('sv-SE');
          var newdate = dateFormatter.format(myCurrentDate);
          
          
          setStartDate(newdate);
        
        } }


      const handleEndDate = (date) => {
     
        if (date!=null) {
          var myCurrentDate = new Date(date);
          var dateFormatter = Intl.DateTimeFormat('sv-SE');
          var newdate = dateFormatter.format(myCurrentDate);

          
          //var date_ = myCurrentDate.getFullYear() + '-' + ( myCurrentDate.getMonth()+1) + '-' +  myCurrentDate.getDate();
         
          setEndDate(newdate);
    
        }    
      }



      const applyDate=()=>{
        getMostUsedKeyword(folder,startDate,endDate)

      }



      //pas de rendering !!
      const resetStat=() => {
        var dateFormatter = Intl.DateTimeFormat('sv-SE');
        getMostUsedKeyword("All Folder","2015-01-01",dateFormatter.format(new Date()));
        setFolder("All Folder");
        setStartDate("2015-01-01");
        setEndDate(dateFormatter.format(new Date()));
        
      }
      




      /////outil
      /*const setTodayDate=()=>{
        var myCurrentDate = new Date();
        var dateFormatter = Intl.DateTimeFormat('sv-SE');
        var newdate =dateFormatter.format(myCurrentDate);
        console.log(newdate);
      }*/






    return(
       <>
        <div className="row">

          {/*houssemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/}


          <div className="card card-stat col">
          <div className="card-body">
          <HighchartsReact
           highcharts={Highcharts}
          options={options}
        />
        

        
        
        <Select defaultValue="All Folder" style={{ width: 150 , marginLeft: 0}}  onChange={(value) =>handleChangeParentFolder(value)} value={folder}  >
        <Option value= "All Folder">All Folders</Option>
        {listParentFolder.map((name) => (
              
             <Option value={name}>{name}</Option>
            
             ))}
          </Select>
          {/*<button onClick={() =>console.log(listParentFolder)}>view list parent</button>
          <button onClick={() =>console.log(client)}>client</button>
          <button onClick={() =>console.log(folder)}>folder</button>*/}
          </div>
        </div>



        {/*cyrinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnne*/}

        <div className="card card-stat col">
          <div className="card-body">
          <HighchartsReact
        highcharts={Highcharts}
        options={optionsDownload}
          />

        <Select defaultValue="All Folder" style={{ width: 150 , marginLeft: 0}}  onChange={(value) =>handleChangeParentFolder1(value)}   >
            <Option value= "All Folder">All Folders</Option>
            {listParentFolder.map((name) => (
              
            <Option value={name}>{name}</Option>
            
             ))}
          </Select>
          {/*<button onClick={() =>console.log(parent)}>parent</button>*/}




{/******************************************************************************************************************************* */}


          <Select defaultValue="mostSearched" style={{ width: 250 , marginLeft: 95}} onChange={(value) =>handleChangeSearchedDocuments(value)} >
             <Option value="mostSearched">Top 5 most Searched</Option>
            <Option value="lessSearched">Top 5 less Searched</Option>
          </Select>
          </div>

        </div>
        {/*<button onClick={() =>console.log(checkMost)}>view checkMost</button>*/}
        {/*<button onClick={() =>console.log(checkLess)}>view checkLess</button>*/}
        </div>

        





        <Row className="justify-content-md-left"  >
                
              
                <Col>
                {/** Datepicker and reset Button section */}
                <div className="filterParameters" id="filterParameters">
                        
                          <Col>
                          <Space>
    
    
      
                          <Text strong>De</Text>
  
                                   < DatePicker defaultValue={moment("2015-01-01", dateFormat)} format={dateFormat}   onChange={(date)=>handleStartDate(date)}  value={moment(startDate, dateFormat)} date={startDate} />
  
                          <Text strong>à</Text>
  
                          
                                < DatePicker  defaultValue={moment()} format={dateFormat} onChange={(date)=>handleEndDate(date)}  value={moment(endDate, dateFormat)}    date={endDate}    />
                                
                                <Button type="primary" icon={<SearchOutlined />}  onClick={()=>applyDate()}       >
                                Chercher
                                </Button>
                                <Button type="primary" shape="circle" icon={<SyncOutlined /> } onClick={()=>resetStat()} />
                              </Space>
                              
                                  
                            </Col>

                        {/*<button onClick={() =>console.log(startDate)}>view startDate </button>
                        <button onClick={() =>console.log(endDate)}>view endDate </button>
                        <button onClick={()=>setTodayDate()}>todayDate</button>*/}
                    
                </div>
                </Col>
                
             </Row>   



























        
     
</>
    )

}