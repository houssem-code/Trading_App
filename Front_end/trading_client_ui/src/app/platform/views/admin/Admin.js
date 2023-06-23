import React, { useState,useRef, useEffect } from 'react'
import './Admin.css'
import Notification from '../../../shared/notification/Notification'
import 'antd/dist/antd.css';
import ClientService from '../../../../services/client-service'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import  AdminClientStat  from '../../components/statistic/AdminClientStat'


import { Table,Button,Modal,Input, Form,Checkbox,InputNumber,Card,Row,Select,Avatar } from 'antd';

import adminService from 'services/admin-Service';
 '../../../../services/admin-Service'


 const { Meta } = Card;
const Admin = () => {                                                                                                                                                                                                                                                                                            

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [isModalDetailsVisible, setIsModalDetailsVisible] = useState(false);
  const [client, setClient] = useState();
  const [user, setUser] = useState();
  const [displayListExtention, setDisplayListExtention] = useState([]);
  const [storageStatistics, setStorageStatistics] = useState([]);
  var listExtentionFile=[];
  const { TextArea } = Input;
  const formRef = useRef(null);
  const [id, setId] = useState()
  const validateMessages = {
    required: 'raison de rejet est requis !',
  };
  const options = {
    credits: {
      enabled: false
  },
    chart : {
      margin: [10, 0, 0, 0] ,
      height: 350,
       width: 221,
      type : 'pie',
    },
    colors: ['#7cb5ec', '#3c83ca'], 
    title: {
      text: 'Repartition de stockage en MO ',
     
      style: {
      
        fontWeight: 'bold',
        fontSize: 10
    }
    },
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
            style: {
      
              fontWeight: 'bold',
              fontSize: 10 ,
              width : 80 
          }, 
            enabled: true,
            format: '{point.name} : {point.y:.0f} MO'
          }
        }
      },
    series: [
      {
      name : "espace",
      colorByPoint: true,
       innerSize: '50%', 
      data:storageStatistics,
    }]
  }
  const [checkNick, setCheckNick] = useState(false);
    const columns = [
        { title: 'Application', dataIndex: 'application', key: 'id',align:"center" },
        { title: 'Email', dataIndex: 'email', key: 'email',align:"center" },
        { title: 'Taille de stockage en GO', dataIndex: 'totalStorageSize', key: 'totalStorageSize',align:"center" },
        { title: 'Date d abonnement', dataIndex: 'subscribtionDate', key: 'subscribtionDate' ,align:"center"},
        {   title: 'Action',
        key: 'action',
        align:"center",
          
          render: (text, record) => (
           ( record.newTotalUsedStorage==null)?
              !record.activated ?  <> 
                 <Button
                 className="see-details"
               onClick={()=>showModalDetails(record)}
          >
             +
          </Button>
              <Button
                 
                  htmlType="submit"
                  className=" admin-button" 
                   onClick={()=>activateClient(record.id)} 
              >
                 <span className="activated-btn"  >accepter</span> 
              </Button>
               <Button
                  
                  htmlType="submit"
                   className="  admin-button-reject " 
                   onClick={()=>showModal(record)}
              >
                  <span className="rejected-btn"  > rejeter</span> 
              </Button>
              </>:<>
                          <Button
                          className="see-details"
                          onClick={()=>showModalDetails(record)}
                     >
                        +
                     </Button>
              <Button
              className="btn-status"
              type="primary"
              htmlType="submit"
              disabled="true"
          >
             <span >acceptée</span>  
          </Button></>:
          
          ( record.newTotalUsedStorage==0)?
          <>
                      <Button
               className="see-details"
               onClick={()=>showModalDetails(record)}
          >
             +
          </Button>
          <Button className="btn-status">demande rejetée</Button></>:
          <>
                      <Button
               className="see-details"
               onClick={()=>showModalDetails(record)}
          >
             +
          </Button>
          <Button className="btn-status">en attente</Button>
          </>

          ),
          fixed: 'right'
      },
        
      ];
      
      const [data, setData] = useState([])
      useEffect(() => {

        getAllClient()
      
    }, [])

    const activateClient=(id)=>{
    
      adminService.activateClient(id).then(resp=> {
        Notification('success', 'Validation réussie', "Client a été Validé avec succès")
       getAllClient()
      })
       .catch(err=>{Notification('error', 'Erruer Validation ', "Merci de reéssayer")})
    }
    
    const getUser=(client)=>{
      adminService.getUser(client).then(resp=> {
      console.log(resp.data)
      setUser(resp.data)
      ClientService.getClientFromLogin(resp.data.login)
      .then((resp) => {
        var storageList = [];
        var totalStorageSizeObj ={ name : "taille totale de stockage", y :  resp.data.totalStorageSize * 1024, }
        var totalUsedStorage ={ name : "taille totale utilisée de stockage", y :  resp.data.totalUsedStorage / 1024 }
        storageList.push(totalStorageSizeObj,totalUsedStorage);
         setStorageStatistics(storageList); 
        console.log(storageList)
      })
      .catch((err) => {
        console.log(err);
      });



      })
       .catch(err=>{Notification('error', 'Erruer Validation ', "Merci de reéssayer")})
    }


    const refuseClient=(refuseParam)=>{
    
      adminService.refuseClient(refuseParam).then(resp=> {
        Notification('success', 'rejet réussi', "Client a été rejeté avec succès")
       getAllClient()
      })
       .catch(err=>{Notification('error', 'Erruer rejet ', "Merci de reéssayer")})
    }


    const submitForm = () => {
      formRef.current.submit();
    };

    const onFinish = (values) => {
    if (Object.keys(values).length==1){
     var refuseParam ={
        "id":id,
        "refuseDesc":values.reason,
        "NewTotalUsedStorage":"0"
    };
    }
    else{

      var refuseParam ={
        "id":id,
        "refuseDesc":values.reason,
        "NewTotalUsedStorage":values.storage
    };

    }
      refuseClient(refuseParam) 
      formRef.current.resetFields();
      getAllClient()
      setIsModalVisible(false);

    };
      
    const getAllClient=()=> {
      adminService.getAllClient().then(resp=> {
        setData(resp.data)
})
.catch(err=> {
  console.log(err)
})

}
const getExtentionFile=(id)=> {
ClientService.getExtentionFileByClientId(id).then(resp => {
        
  listExtentionFile =resp.data.map(item=>item.extentionFile.label)
    setDisplayListExtention(listExtentionFile)
  })
      .catch(err => {
        console.log(err)
      })

    }


    const showModal = (client) => {
      setClient(client)
      setId(client.id);
      setIsModalVisible(true);


    };
     
    const showModalDetails = (client) => {
      
      setIsModalDetailsVisible(true);
      setClient(client)
      getExtentionFile(client.id)
      getUser(client)

    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handleCancelDetails = () => {
      setIsModalDetailsVisible(false);
      setDisplayListExtention([])
    };

    const onCheckboxChange = (e) => {
      setCheckNick(e.target.checked);
    };
 
    return ( showStatistics ? <AdminClientStat handleCancelDetails={handleCancelDetails} setShowStatistics = {setShowStatistics} user = {user?.login }/> /* {user?.firstName} */:
      <Row className="row-Container">
        <div className="col-lg">
       
      <Card  bordered={false}  >

      
        <Table
        columns={columns}
      
        dataSource={data}
        pagination={true} scroll={{ x: 550 }} sticky 
      />
          <Modal title="Vous devez mentionner les raisons du rejet" visible={isModalVisible} onOk={submitForm} onCancel={handleCancel}
                 footer={[
                  <Button key="back" className="back-btn" onClick={handleCancel}>
                    Annuler
                  </Button>,
                  <Button key="submit" type="primary"  onClick={submitForm}>
                    Valider
                  </Button>,
           
                ]}>
          <Form ref={formRef}
  onFinish={onFinish} validateMessages={validateMessages}
    >  
    <Form.Item    name={'reason'}
        
        rules={[
          {
            required: true,
          },
        ]}>
          <TextArea rows={4} />
          </Form.Item>
          <Form.Item >
        <Checkbox checked={checkNick} onChange={onCheckboxChange}>
        Cochez si la raison de rejet est relatif à l'espace de stockage
        </Checkbox>
      </Form.Item>
      {(checkNick)? <Form.Item
     
        name={['storage']}
        label="nouvel espace de stockage proposé"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
     
        
      >
        <InputNumber  placeholder={client?.totalStorageSize}/>
      </Form.Item>:<></>}
          </Form>
      </Modal>

 <Modal title="Demande de Client" visible={isModalDetailsVisible} onOk={submitForm} onCancel={handleCancelDetails}
      className="modal-info"          footer={(client?.refuseDesc)||(client?.activated)?<></>:[
                   
                  <Button key="back" className="back-btn" onClick={()=>{handleCancelDetails();showModal(client)}}>
                    Rejeter
                  </Button>,
                  <Button key="submit" type="primary" onClick={()=>{handleCancelDetails();activateClient(client.id)}}> Accepter </Button>

                ]}>

{(client !== undefined)?
<div className="row ">
<div className="cl-6">
<div className="user-card user-info"  >
            <h4 className="title-card" >Informations client</h4>
            <div className="user-card-item">
                <label for="name"> Application :</label>
                 <span className="client_info">{client.application} </span>
            </div>
            <div className="user-card-item">
                <label for="status"> Date d'abonnement :</label>
               <span className="client_info"> {client.subscribtionDate}</span> 
            </div>

            <div className="user-card-item">
                <label for="status"> Taille de stockage totale en GO :</label>
                 <span className="client_info"> {client.totalStorageSize}</span> 
            </div>
            <div className="user-card-item">
                <label for="status"> Stockage total utilisé en GO :</label>
               <span className="client_info">{client.totalUsedStorage}</span> 
            </div>

            <div className="user-card-item">
                <label for="description"> Description :</label>
                 <span className="client_info">{client.description}</span>
            </div>

            <div className="user-card-item">
                <label for="status"> Taille maximum d'un document en KO  :</label>
                 <span className="client_info">{client.fileSize} </span>
            </div>
            <div className="user-card-item user-extentions">
                <label for="extentions" className="extention-list"> Liste des extentions :</label>
              
                <div>
               
                <Form.Item
                  name="extentionFile"
                  rules={[{ required: true, message: 'merci d\'ajouter les extentions souhaitée !' }]}
              >

                {displayListExtention.length!=0?
                <Select
                    mode="multiple"
                    disabled
                    defaultValue={displayListExtention}
                   
                >
                  {displayListExtention}

                </Select>:<></>}

              </Form.Item>
              </div>
            </div>
        </div>
</div>
<div className="col">
<Card className="card-Rep-admin" title="Représentant" bordered={false}>
              <div className="card-image">
                <div className="avatar" >
                  <Meta
                    avatar={
                      <Avatar
                        icon="user"
                        shape="circle"
                        size={60}

                      />
                    }
                    title={user?.firstName + " " + user?.lastName}
                  />
                </div>
                <hr></hr>
                <div className="infoClient">
                  <div className="items">
                    <i class="fas fa-user"></i>
                    {user?.login}
                  </div>
                  <div className="items">
                    <i class="fas fa-envelope"> </i> {user?.email}
                  </div>
                </div>
              </div>

            </Card>
           
{client.activated ? <Card className="card-Rep-admin statistics pointur-admin" bordered={false}  onClick={()=>setShowStatistics(true)}>

<HighchartsReact
    highcharts={Highcharts}
    options={options}
    onClick={()=>setShowStatistics(true)}
  />

            </Card> : <Card className="card-Rep-admin statistics" bordered={false} >

<HighchartsReact
    highcharts={Highcharts}
    options={options}
    onClick={()=>setShowStatistics(true)}
  />

            </Card> }        

            </div> 
</div>

 :
            <></>}

      </Modal>
      </Card>
      </div>
      </Row>
    )

}
export default Admin;
