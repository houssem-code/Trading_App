import React, { useEffect, useState, useContext } from "react";
import Highcharts from 'highcharts';
import './AdminClientStat.css'
import HighchartsReact from 'highcharts-react-official'
import { Form, Card, Input, Button,Select } from 'antd';
import { Bar } from "react-chartjs-2";
import ClientService from "../../../../services/client-service";
import AuthentificationContext from "../../../../context/authentification-context";
import logo from "../../../../assets/img/png-computer-keyboard-backspace-computer-icons-delete-5afbab452d4129.0659040215264428211854.png"
function AdminClientStat(props) {

  const [extensionStats, setExtensionStats] = useState([]);
  const [parentFolderStats, setParentFolderStats] = useState([]);
  const [parentFolderType, setParentFolderType] = useState("storage");
  const [mouthUpload, setMouthUpload] = useState([]);
  const [mouthlyUpload, setMouthlyUpload] = useState([]);
  const [mouthlyDownlaod, setMouthlyDownlaod] = useState([]);
  const [uploadStats, setUploadStats] = useState([]);
  const [userDownload, setUserDownload] = useState([]);
  const [downloadStats, setDownloadStats] = useState([]);
  const [storageStatistics, setStorageStatistics] = useState([]);
  const authentificationContext = useContext(AuthentificationContext);

  const { Option } = Select;
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

  useEffect(() => {
    getExtensionStatistics(props.user);
    getParentStatisticsStorage(props.user);
    getClientFromLogin(props.user);
    getUserUploadStatistics(props.user);
    getDownloadStatistics(props.user);
    getMonthlyUploadStat(props.user);
    getMonthlyDownloadStat(props.user);
  }, []);

  const getExtensionStatistics = (login) => {
    var listOfObjects = [];
    ClientService.getExtensionStatistics(login)
      .then((resp) => {
        resp.data.map((item) => {
          var singleObj = {name:item[0],y:item[1]/ 1048576 };
          listOfObjects.push(singleObj);})
          setExtensionStats(listOfObjects);
        })

      .catch((err) => {
        console.log(err);
      });
  };

  const getParentStatistics = (login) => {
    var listOfObjects = [];
    ClientService.getParentStatistics(login)
      .then((resp) => {
        resp.data.map((item) => {
          var singleObj = {name:item[0],y:item[1]};
            listOfObjects.push(singleObj);
        });
        setParentFolderStats(listOfObjects);
     
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const getParentStatisticsStorage = (login) => {
    var listOfObjects = [];
    ClientService.getParentStatisticsStorage(login)
      .then((resp) => {
        resp.data.map((item) => {
          var singleObj = {name:item[0],y:item[1]/ 1048576};
            listOfObjects.push(singleObj);
        });
        setParentFolderStats(listOfObjects);
     
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserUploadStatistics = (login) => {
    var listOfObjects = [];
    var listOfObjectsDownload = [];
    ClientService.getUserUploadStatistics(login)
      .then((resp) => {
        resp.data.map((item) => {
          var singleObj = {name:item[0],y:item[1]};
          var singleObjDownload = {name:item[0],y:item[2]};
          listOfObjects.push(singleObj);
          listOfObjectsDownload.push(singleObjDownload);

        });

        setUploadStats(listOfObjects);
        setUserDownload(listOfObjectsDownload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const  getUserDownloadStatistics = (login) => {
    var listOfObjects = [];
    var listOfObjectsDownload = [];
    ClientService.getUserDownloadStatistics(login)
      .then((resp) => {
        resp.data.map((item) => {
          var singleObj = {name:item[0],y:item[1]};
          var singleObjDownload = {name:item[0],y:item[2]};
          listOfObjects.push(singleObj);
          listOfObjectsDownload.push(singleObjDownload);

        });

        setUploadStats(listOfObjects);
        setUserDownload(listOfObjectsDownload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDownloadStatistics = (login) => {
    var listOfObjects = [];
    ClientService.getDownloadStatistics(login)   
      .then((resp) => {
        
        resp.data.map((item) => {
          var singleObj = {name:item[0],y:item[1]};
          listOfObjects.push(singleObj);
          
        });
        setDownloadStats(listOfObjects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMonthlyUploadStat = (login) => {
    var listOfMonth = [];
    var listOfUpolad = [] ;
    ClientService.getMonthlyUploadStat(login)   
      .then((resp) => {
        
        resp.data.map((item) => {
    
          listOfMonth.push(monthNames[new Date(item[1]).getMonth()]);
          listOfUpolad.push(item[0])
        });
        setMouthUpload(listOfMonth)
        setMouthlyUpload(listOfUpolad)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMonthlyDownloadStat = (login) => {
 
    var listOfDownloads = [] ;
    ClientService.getMonthlyDownloadStat(login)   
      .then((resp) => {
        
        resp.data.map((item) => {
          listOfDownloads.push(item[0])
        });
        setMouthlyDownlaod(listOfDownloads)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getClientFromLogin = (login) => {
    ClientService.getClientFromLogin(login)
      .then((resp) => {
        var storageList = [];
        var totalStorageSizeObj ={ name : "taille totale de stockage", y :  resp.data.totalStorageSize * 1024, }
        var totalUsedStorage ={ name : "taille totale utilisé de stockage", y :  resp.data.totalUsedStorage / 1024 }
        storageList.push(totalStorageSizeObj,totalUsedStorage);
        setStorageStatistics(storageList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  function handleChange(value) {
  
    if ( value ==="upload") {
     getUserUploadStatistics(props.user);  
   }
   else {
     getUserDownloadStatistics(props.user)
   } 
 } 
 function handleChangeParent(value) {
  
  if ( value ==="storage") {
    setParentFolderType("storage")
    getParentStatisticsStorage(props.user);
 }
 else {
  setParentFolderType("number")
  getParentStatistics(props.user);
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
    text: 'Repartition de stockage par type d extension'
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
      text: 'taille totale par extension'
    }},
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f} MO'
        }
      }
    },
  series: [{
    name : "taille en MO ",
    colorByPoint: true,
    data: extensionStats
  }]
}

  const optionsStorage = {
    credits: {
      enabled: false
  },
    chart : {
      type : 'pie'
    },
    title: {
      text: 'Repartition de stockage en MO '
    },
    colors: ["#7cb5ec", "#AA4643"],

      legend: {
    enabled: false
  },
    xAxis: {
      type: 'category'
    },

      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.name} : {point.y:.1f} MO'
          }
        }
      },
    series: [{
      name : "espace",
      colorByPoint: true,
       innerSize: '50%', 
      data: storageStatistics,

    }]
  }

  const optionsUploadDownload = {
    credits: {
      enabled: false
  },
    chart : {
      type : 'column'
    },
    title: {
      text: 'Nombre de << Download >> << Upload >>  par utilisateur'
    },
    colors: ["#50b432", "#e4d354"],
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: ''
      }},
  
    series: [{
      name : "nombre de Download",
      colorByPoint: false,
      data: userDownload,
    },
    {
      name : "nombre de Upload",
      colorByPoint: false,
      data: uploadStats,   
    }]
  }

  const optionsParentFolder = {
    credits: {
      enabled: false
  },
    chart : {
      type : 'pie'
    },
    title: {
      text: 'Repartition de dossiers parent '
    },
    colors: ["#7cb5ec", "#2b908f", "#8085e9","#90ed7d","#AA4643", "#f7a35c",  "#f15c80", "#e4d354",  "#f45b5b", "#91e8e1"],

      legend: {
    enabled: false
  },
    xAxis: {
      type: 'category'
    },
    series: [{
      name : "nombre de documents",
      colorByPoint: true,
       innerSize: '50%', 
      data: parentFolderStats,
      dataLabels :{
        formatter: function () {
            return this.point.name 
        },
        color: '#ffffff',
        distance: -33
    }
    }]
  }
  const optionsParentFolderStorage = {
    credits: {
      enabled: false
  },
    chart : {
      type : 'pie'
    },
    title: {
      text: 'Repartition de dossiers parent '
    },
    colors: ["#7cb5ec", "#2b908f", "#8085e9","#90ed7d","#AA4643", "#f7a35c",  "#f15c80", "#e4d354",  "#f45b5b", "#91e8e1"],
      legend: {
    enabled: false
  },
    xAxis: {
      type: 'category'
    },
    series: [{
      name : "taille de Dossier en MO",
      colorByPoint: true,
       innerSize: '50%', 
      data: parentFolderStats,
      dataLabels :{
        formatter: function () {
            return this.point.name 
        },
        color: '#ffffff',
        distance: -33
    }
    }]
  }
  const optionsDownload = {
    credits: {
      enabled: false
  },
    chart : {
      type : 'bar'
    },
    title: {
      text: 'Top 5 documents << Downloaded >>'
    },
    colors: ["#7cb5ec", "#AA4643", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],
      legend: {
    enabled: false
  },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Nombre de download'
      }},
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{y}'
          }
        }
      },
    series: [{
      name : "nombre de download",
      colorByPoint: true,
      data: downloadStats,
    }]
  }
  const optionsTime = {
  
    credits: {
      enabled: false
  },
  chart: {
    type: 'line'
  },
  title: {
    text: 'Nombre de téléchargement mensuelle'
  },
  legend: {
    enabled: true
  },

  xAxis: {
    categories: mouthUpload
  },
  yAxis: {
    title: {
      text: 'Nombre de document'
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      },
      enableMouseTracking: false
    }
  },
  series: [{
    name: 'Nombre de << Download >>',
    data: mouthlyDownlaod
  },{
    name: 'Nombre de << Upload  >>',
    data: mouthlyUpload
  }]
}
  return (
    <>
     <div className ="btn-div-return">
     
       <Button className = "btn-return" onClick = {()=>{ props.setShowStatistics(false),props.handleCancelDetails()}}><img src={logo}  className="photo" alt="Logo" />Retour en arrière</Button>
    </div>
      <div className="row">
        <div className="card card-stat col">
          <div className="card-body">
          <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
          </div>
        </div>
        <div className="card card-stat col">
          <div className="card-body">
          <HighchartsReact
    highcharts={Highcharts}
    options={optionsStorage}
  />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="card card-stat col">
          <div className="card-body">
          <HighchartsReact
    highcharts={Highcharts}
    options={optionsUploadDownload}
  />
  <Select defaultValue="upload" style={{ width: 300 , marginLeft: 140 }} onChange={handleChange}>
      <Option value="upload">Top 5 upload</Option>
      <Option value="download">Top 5 download</Option>
    </Select>
          </div>
        </div>
        <div className="card card-stat col">
          <div className="card-body">
          {parentFolderType === "storage"?          
          <HighchartsReact
    highcharts={Highcharts}
    options={optionsParentFolderStorage}
  />:   <HighchartsReact
  highcharts={Highcharts}
  options={optionsParentFolder}
/>}

  <Select defaultValue="storage" style={{ width: 300 , marginLeft: 140 }} onChange={handleChangeParent}>
      <Option value="storage">Répartition par taiile de stockage</Option>
      <Option value="number">Répartition par nombre de documents</Option>
    </Select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="card card-stat col">
          <div className="card-body">
          <HighchartsReact
    highcharts={Highcharts}
    options={optionsDownload}
  />
          </div>
        </div>
        <div className="card card-stat col">
          <div className="card-body">
          <HighchartsReact
    highcharts={Highcharts}
    options={optionsTime}
  />
          </div>
        </div>
        </div>
        <div className ="btn-div-return">
       <Button className = "btn-return" onClick = {()=>{ props.setShowStatistics(false),props.handleCancelDetails()}}><img src={logo}  className="photo" alt="Logo" />Retour en arrière</Button>
    </div>
    </>
  );
}

export default AdminClientStat;
