import React, { Component, useContext, useState, useEffect,useRef } from 'react'
import axios from 'axios';
import { ProgressBar } from "react-bootstrap";
import { Progress,Alert,Upload} from 'antd';
import {Avatar,Form, Card, Input, Button,Select, Modal, Radio, Steps, Tooltip, Switch} from 'antd';
import {CloseOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import './UserProfile.css'
import {Container,Row,Col} from "react-bootstrap";
import { UserOutlined, BankOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, SolutionOutlined, LoadingOutlined, SmileOutlined  } from '@ant-design/icons';
import AdminService from '../../../services/admin-Service'
import ClientService from '../../../services/client-service'
import AuthentificationContext from '../../../context/authentification-context'
import Notification from '../../shared/notification/Notification'
import { saveAs } from 'file-saver';
import { Spin } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;
const { Step } = Steps;

const props = {
  name: 'file',
  multiple: true,
  status :'done',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  accept: ""
};

const stepsModal = [
  {
    title: 'Désactiver',
    content: 'Ce dossier parent ne peut pas être supprimé car il contient des fichiers. vous devez le désactiver puis le compresser et enfin le supprimer définitivement '
  },
  {
    title: 'compresser',
    content: ' Puisque le dossier est désactivé, vouz devez maintenant le compresser et le télécharger avant le supprimer ',
  },
  {
    title: 'Supprimer',
    content: 'Supprimer définitivement le dossier ',
  },
];


function User() {
  const authentificationContext = useContext(AuthentificationContext);
  const [form] = Form.useForm();
  const [formEditted] = Form.useForm();
  const formBackUp = useRef();
  const [userDelegate, setUserDelegate] = useState("");
  const [client, setClient] = useState("");
  const [extentionFile, setExtentionFile] = useState([]);
  const [hasApplication, setHasApplication] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalMotifVisible, setIsModalMotifVisible] = useState(false);
  const [addNewParentFolder, setAddNewParentFolder] = useState(false);
  const [displayListExtention, setDisplayListExtention] = useState([]);
  const [listParentFolderByClient, setListParentFolderByClient] = useState([]);
  const [listDeleteParentFolderByClient, setListDeleteParentFolderByClient] = useState([]);
  const [value, setValue] = useState(1);
  const [acceptMultipleFile1, setAcceptMultipleFile1] = useState(false);
  const [delegate,setDelegate]=useState("");
  const [parent,setParent]=useState("");
  const [edit,setEdit]=useState(false);
  const [parentExist,setParentExist]=useState(false);
  const [parentInputEmpty,setParentInputEmpty]=useState(false);
  const [visible,setVisible]=useState(false);
  const [visibleModal,setVisibleModal]=useState(false);
  const [visibleBackUp,setVisibleBackUp]=useState(false);
  const [param, setParam] = useState({paramParentFolderCompositeID:{parent:""}});
  const [current, setCurrent] = useState(0);
  const [isNext,setIsNext] = useState(false); 
  const [inCompress,setInCompress] = useState(false); 
  const [fileNameDownload , setFileNameDownload ] =useState("");
  const [fileNombre,setFileNombre] = useState(0);
  const [nombreOfFilesDownloaded,setNombreOfFilesDownloaded] = useState(0);
  const [isSubmitted ,setIsSubmitted ] = useState(false)
  const [fileListBackUp , setFileListBackUp ] = useState(null);
  const [activeShow, setactiveShow] = useState(true)
  const [folderForRestor, setFolderForRestor] = useState();
  //user
  const [user, setUser] = useState();
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  });
  
  const children = [];
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  var listExtentionFile=[];

  useEffect(() => {

    getUserByLogin()

  },[authentificationContext.profile.login])
 

  useEffect(() => {

    submitForm()

  },[isSubmitted])


  useEffect(() => {
    getExtentionFile()
    getParentFolderByClientId()
    getDeleteFolder(client.id) 

  }, [client.id])

  const submitForm = () => {
    if (isSubmitted == true) {
      formBackUp.current.submit();
    setIsSubmitted(false)
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const restoreFolder = (parentFolder) => {
     ClientService.restoreFolder(folderForRestor).then(resp=> {
      setFileListBackUp(null)
      setVisibleBackUp(false)
      getParentFolderByClientId()
      getDeleteFolder(client.id) 
  }).catch(err=> {
      setFileListBackUp(null)  
  }) 

  }

  const showModal = (paramFolder) => { 
    if (inCompress==true) {
    if (paramFolder.paramParentFolderCompositeID.parent == param.paramParentFolderCompositeID.parent) {
      if (paramFolder.active === false)
    {
      setCurrent(1);
    }
    else {
      setCurrent(0);
    }
    setVisible(true);
    setParam(paramFolder)
    }
    else {
      setVisibleModal(true)
    }
  }
  else {
    if (paramFolder.active === false)
    {
      setCurrent(current + 1);
    }
    setVisible(true);
    setParam(paramFolder);
    setDownloadInfo({
      progress: 0,
      completed: false,
      total: 0,
      loaded: 0,
    });
    }
  }
 
  const showModalBackUp = (paramFolder) => {
    setVisibleBackUp(true);
  }

  const handleCancel_ = () => {
    setactiveShow(true)
    setVisible(false);
    setCurrent(0);
  };
  const handleCancelDelete = () => {
    setVisibleModal(false);
  };
  const handleCancelBackUp = () => {
   setVisibleBackUp(false);
  };

  const onFinish_ = values => {

    let formData = new FormData();
    if (fileListBackUp) {
      fileListBackUp.map(file => formData.append("file", file.originFileObj ))
        ClientService.backUpFolder(client.application,formData).then(resp=> {
            Notification ('success', 'Ajout réussi', ' Document(s) ont été ajouté avec succès')
            setFileListBackUp(null)
            setVisibleBackUp(false)
           restoreFolder(param)

        }).catch(err=> {

            setFileListBackUp(null)

        })
      
    }    
    
};

  const ZipFolder =  async (folder) => {  
    const zip = require('jszip')();
    ClientService.getOwnerOfFolder(folder.paramParentFolderCompositeID.parent).then(async resp=>{
      await Promise.all(resp.data.map( async owner=>{
    let resp= await ClientService.getFilesFromFolderByOwner(folder.paramParentFolderCompositeID.parent,folder.client.id,owner)
       let files = resp.data; 
      setNombreOfFilesDownloaded(0);
    for (let i = 0; i <files.length ; i++) {
        setFileNombre(files.length)  
        let idf = files[i].id
        setFileNameDownload(files[i].fileName)
        await axios({
        url: 'http://localhost:9009/client/downloadFileBackUP/'+idf,
        method: "GET",
        responseType: "blob", 
        onDownloadProgress: (progressEvent) => {
        setInCompress(true);
        const { loaded, total } = progressEvent;
        setDownloadInfo({
        progress: Math.floor((loaded * 100) / total),
        loaded,
        total,
        completed: false,
    });
    }
}).then(data=>{
  setNombreOfFilesDownloaded(i+1);
setDownloadInfo((info) => ({
  ...info,
  completed: true,
}))});

var blob = new Blob([resp.data]);
let folderZip = zip.folder(owner).folder(folder.paramParentFolderCompositeID.parent);
folderZip.file(files[i].reference, blob)   
}
}    
      ))
      zip.generateAsync({type: "blob"}).then(content => {
        saveAs(content, folder.paramParentFolderCompositeID.parent+".zip") });
        setIsNext(true)
        setVisible(true);
        setCurrent(1)
    
    })
  }

  const formatBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  const onFinishFailed = (errorInfo) => {
    //Notification('err', 'please complete the form', "");
    console.log('Failed:', errorInfo);
  };
  const getUserDelegate = (login) => {
    login = authentificationContext.profile.login
    AdminService.retrieveUserByLogin(login).then(resp => {
      setUserDelegate(resp.data)
    })
      .catch(err => {
        console.log(err)
      })
  };

  const getUserByLogin = (login) => {
    login = authentificationContext.profile.login
    AdminService.getUserByUsername(login).then(resp => {
      setUser(resp.data)
    })
      .catch(err => {
        console.log(err)
      })
  };



  const getExtentionFile = () => {
    ClientService.getAllExtentionFile().then(resp => {
      resp.data.map(item=>{
        children.push(<Option key={item.id}>{item.label}</Option>);
      })
      setExtentionFile(children)
    })
        .catch(err => {
          console.log(err)
        })
  };

  const getParentFolderByClientId = () => {
    ClientService.findParentFolderByClientId(client.id).then(response => {
      setListParentFolderByClient(response.data)
      setactiveShow(true)
    })
  }

  const userHasApplication = (login) => {
    AdminService.hasApplication(login).then(resp => {
      setHasApplication(resp.data)
      if (resp.data) {
        AdminService.getClient(login).then(resp => {
          setClient(resp.data)
          AdminService.getUser(resp.data).then(response => {
            setDelegate(response.data)
          })
          ClientService.getExtentionFileByClientId(resp.data.id).then(resp => {
            listExtentionFile=resp.data.map(item=>item.extentionFile.label)
            setDisplayListExtention(listExtentionFile)
          })
              .catch(err => {
                console.log(err)
              })

        })
          .catch(err => {
            console.log(err)
          })
      };

    })
      .catch(err => {
        console.log(err)
      })
  };

  const onFinish = values => {
    
    const newClient = {
      username : authentificationContext.profile.login,
      firstname: values.firstname,
      lastname: values.lastname,
      password: values.password
    }
    console.log(newClient)
    AdminService.updateUser(newClient).then(resp => {
      Notification('success', 'User Updated', "")
      setUser(resp.data)
    }

    ).catch(err => {
      setLoading(false)
      Notification('error', "User not Updated", '')

    })

  }

  function handleChange(value) {
    listExtentionFile=value
  }

  function showRejectModal(value) {
    setIsModalMotifVisible(true);
  }

  function rejectNewStorage(client){
    AdminService.deleteClient(client.id).then(resp => {
      setClient("")
      setHasApplication(false)
      listExtentionFile=[]
    }).catch(err => {
      console.log(err)
    })
  }

  function acceptNewStorage() {
    confirm({
      title: 'Confirmation',
      icon: <ExclamationCircleOutlined />,
      content: 'Si vous cliquez sur le bouton OK votre espace de stockage va avoir la valeur de '+client.newTotalUsedStorage+' Go',
      onOk() {
          AdminService.updateNewStorageForClient(client).then(resp => {
            setClient(resp.data)
            Modal.success({
              content: 'Félicitation votre compte à été validé avec succès désormais vous pouvez créé vos dossier parent pour le téléchargement de vos fichiers',
            });
          })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleCancel = () => {
    setIsModalMotifVisible(false);
  };


  const addParentFolder = () =>{
    setAddNewParentFolder(true)
  }

  const closeInput= () =>{
    setAddNewParentFolder(false)
    setParentInputEmpty(false)
    setParentExist(false)
  }

  function confirmDelete(parentFolder) {
    ClientService.desactivateParentFolder(parentFolder).then(response=>{
      Notification('success', 'Dossier parent désactivé avec succés')
      getParentFolderByClientId()
    
    })

  }

  function confirmDeleteModal(parentFolder) {
    ClientService.desactivateParentFolder(parentFolder).then(response=>{
      setactiveShow(false)
      Notification('success', 'Dossier parent désactivé avec succés')
      getParentFolderByClientId()
   
      setCurrent(current + 1);
    })
       
  }

  const saveParentFolder = () => {
    setParentInputEmpty(false)
    if (parent != '') {
      var listParents = []
      listParentFolderByClient.forEach(item => listParents.push(item.paramParentFolderCompositeID.parent))
      if (!listParents.includes(parent)) {
        ClientService.saveNewParentFolder({
          "paramParentFolderCompositeID": {
            "parent": parent,
            "owner": delegate.id
          },
          "active": true,
          "disabled": true,
          "client": client,
          "acceptMultipleFile": acceptMultipleFile1
        }).then(resp => {
          Notification('success', 'Dossier parent ajouté avec succés')
          listParentFolderByClient.push(resp.data)
        }).catch(err => {
          console.log(err)
        }).then(() => {
          setAddNewParentFolder(false)
          setParent('')
        })
      }
    }else{
      setParentInputEmpty(true)
    }
  }

  const editParentFolder= (param) =>{
    setEdit(true)
    param.disabled=false
  }

  const saveParentFolderEddited = (param,acceptMultipleFile1,parent)=>{
    if(parent==''){
      parent=param.paramParentFolderCompositeID.parent
    }
    param.disabled=true
    ClientService.editParentFolder(param,parent,acceptMultipleFile1).then((response)=>{
      Notification('success', 'Dossier parent modifié avec succés')
      setEdit(false)
      getParentFolderByClientId()
    })
  }

  const closeEdit=(param)=>{
    param.disabled=true
    setEdit(false)
  }

  const reactivateParentFolder=(param)=>{
    ClientService.reactivateParentFolder(param).then(response=>{
      getParentFolderByClientId()
      Notification('success', 'Dossier parent réactivé avec succés')
     
    })
  }
const Annuler = () =>{
  setInCompress(false);
  setIsNext(false);
  setVisible(false);
  setCurrent(0);
  setactiveShow(true)
}
  const deleteParentFolder= (param) => {
    ClientService.getDocumentListByParentFolderAndUser(param.paramParentFolderCompositeID.parent,authentificationContext.profile.login).then(response => {
      if(response.data){
        showModal(param);
      }else {
        ClientService.deleteParentFolderByParamFolderCompositId(param.paramParentFolderCompositeID).then(response => {
          Notification('success', 'Dossier parent supprimé avec succés')
          getParentFolderByClientId()
        })

      }
    })

  }

  const deleteParentFolderModal= (param) => {

     ClientService.getFilesFromFolder(param.paramParentFolderCompositeID.parent,param.client.id).then( async resp => {
      let files = resp.data; 
    for (let i = 0; i <files.length ; i++) {
    let idf = files[i].id

      //ClientService.deleteFile(idf).then(
      ///line added by houssem
      ClientService.deleteDocumentFromAll(client.id,idf).then(

      ) .catch(err => {
        console.log(err)
      }) 

      if (i == files.length-1){
        ClientService.deleteParentFolder(param).then(response => {
          
          Notification('success', 'Dossier parent supprimé avec succés')
          setVisible(false)
          setactiveShow(true)
          setInCompress(false);
          setIsNext(false);
          setCurrent(0);
          getParentFolderByClientId()
          getDeleteFolder(client.id) 
       
        })  
      }
    }  
    })
      .catch(err => {
        console.log(err)
      })  
 
  }

  const onChange = e => {
    if(e.target.value==1){
      setAcceptMultipleFile1(false)
    }else{
      setAcceptMultipleFile1(true)
    }
    setValue(e.target.value);
  };

  const onChangeRadio = e => {
    if(e.target.value==false){
      setAcceptMultipleFile1(false)
    }else{
      setAcceptMultipleFile1(true)
    }
  }

  const onChangeInput = e => {
    setParent(e.target.value)
    if(e.target.value===''){
      setParentInputEmpty(true)
    }else{
      setParentInputEmpty(false)
      var listParents = []
      listParentFolderByClient.forEach(item => listParents.push(item.paramParentFolderCompositeID.parent))
      if (listParents.includes(e.target.value)) {
        setParentExist(true)
      }else{setParentExist(false)}
    }
  }

const showModalOfDelete=() =>{
setVisible(true);
setVisibleModal(false);
setCurrent(1)
}



  const onChangeActive =(el) => (checked)=> {
    if (checked === true){
      reactivateParentFolder(el)
    }
    else{
      confirmDelete(el)
    }
  }



      
  const handleUpload_ =(el)=> ({ fileList }) => {
    setFolderForRestor(el);
    if (fileList.length>1){
      fileList.splice(0, 1);
    }
    setFileListBackUp(fileList )
    setIsSubmitted(true)

  
  };

  const getDeleteFolder =(id)=> {
    let list = [];
    ClientService.getDeleteFolder(id).then(  resp =>{
    /* setListDeleteParentFolderByClient([resp.data[0].client]) */
    resp.data.map(folder=>list.push({parent:folder.paramParentFolderCompositeID.parent}))
    setListDeleteParentFolderByClient(resp.data)
  })
  }

  
  useEffect(() => {

    getUserDelegate(authentificationContext.profile.login)

  }, [authentificationContext.profile.login])
  useEffect(() => {

    userHasApplication(authentificationContext.profile.login)

  }, [])

  return (
    <>
      <Container fluid className="card-Container">

        <Row>
          <Col md="12">
          <Row className="row-Container"></Row>

          </Col>
          
        </Row>

        {/****************STEP STATUS CLIENT**********/}

        

        {/****************STEP STATUS CLIENT**********/}


       

        

        {user ?
        <Row className="row-Container">
        <Form form={form} className="userProfile-form"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
          <Col sm={4}></Col>
          <Col md="4">
            <Card className="card-APPL">
              <div className="card-image">

                <div className="author">
                  <Avatar icon={<UserOutlined />} shape="circle" size={120} />
                </div>
              </div>
              <div >
                <div className="FormAppSubsc"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    
                    label="Username"
                    name="username"
                  >
                    {/*<Input prefix={<i className="far fa-building" ></i>} disabled  placeholder={client.application?client.application:"Username" } />*/}
                    <Input defaultValue={user.username} prefix={<i className="far fa-building" ></i>} disabled  placeholder={user.username} />
                  </Form.Item>
                  <Form.Item
                    label="Firstname"
                    name="firstname"
                    rules={[{ required: true, message: 'Please add a first name.' }]}
                  >
                    <Input defaultValue={user.firstname} prefix={<UserOutlined className="site-form-item-icon" />} placeholder={user.firstname} />
                  </Form.Item>

                  <Form.Item
                      label="Lastname"
                      name="lastname"
                      rules={[{ required: true, message: 'Please add a name ! ' }]}
                  >
                    <Input defaultValue={user.lastname} prefix={<UserOutlined className="site-form-item-icon" />}  placeholder={user.lastname}/>
                  </Form.Item>

                  <Form.Item
                  label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please add a password !' }]}
                  >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                  </Form.Item>

                  

                  <Form.Item
                      label="Address"
                      name="fileSize"
                      rules={[{ required: true, message: 'Please add a crypto address !' }]}
                  >
                    <Input defaultValue={user.address} prefix={<i class="fas fa-cloud-upload-alt"></i>}  placeholder={"Address" } />
                  </Form.Item>

                  <Form.Item shouldUpdate={true} >
                    <Button type="primary" htmlType="submit">
                      Validate
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Card>
          </Col>
          <Col sm={4}></Col>
          <Col md="20">
          </Col>
          </Form> 
        </Row>:<></>}
      </Container>
      <Modal
          visible={visible}
          title={ `Attention - suppression de dossier  ${param.paramParentFolderCompositeID.parent}` } 
          onCancel={handleCancel_}
          footer={null}
        >

<Steps style={{marginTop: '24px'}} current={current}>
        {stepsModal.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{marginTop: '24px', marginBottom : '26px'}}>{stepsModal[current].content}</div>
      {current === stepsModal.length - 2 && ( downloadInfo.loaded > 0) ? (downloadInfo.progress=="Infinity")?      
 <>
 <li className="list-group-item"  style={{ marginBottom : '26px'}}>
 <div className="row">
   <div className="col-12 d-flex">
     <div className="d-inline font-weight-bold text-truncate">{name}</div>
     <div className="d-inline ml-2">
       <small>
         {downloadInfo.loaded > 0 && (
           <>
             <span className="text-success">
               {formatBytes(downloadInfo.loaded)}
             </span>
             / {formatBytes(downloadInfo.total)} - { fileNameDownload}
           </>
         )}

         {downloadInfo.loaded === 0 && <>Initializing...</>}
       </small>
     </div>
     <div className="d-inline ml-2 ml-auto">
       {(nombreOfFilesDownloaded === fileNombre) ? <> téléchargement terminé </> :<>   {downloadInfo.completed && (
         <span className="text-success">
           téléchargement {nombreOfFilesDownloaded}/{fileNombre}
         </span>
       )}</>
       }
    
     </div>
   </div>
   <div className="col-12 mt-2">
   <Progress percent={70}  status="exception"  />


   </div>
 </div>

</li>
 <Alert
style={{ marginBottom : '26px'}}
 message="Erreur de téléchargements"
 
 type="error"
 showIcon
/>
</>
 :
 
 <li className="list-group-item"  style={{ marginBottom : '26px'}}>
      <div className="row">
        <div className="col-12 d-flex">
          <div className="d-inline font-weight-bold text-truncate">{name}</div>
          <div className="d-inline ml-2">
            <small>
              {downloadInfo.loaded > 0 && (
                <>
                  <span className="text-success">
                    {formatBytes(downloadInfo.loaded)}
                  </span>
                  / {formatBytes(downloadInfo.total)} - { fileNameDownload}
                </>
              )}

              {downloadInfo.loaded === 0 && <>Initializing...</>}
            </small>
          </div>
          <div className="d-inline ml-2 ml-auto">
            {(nombreOfFilesDownloaded === fileNombre) ? <> téléchargement terminé </> :<>   {downloadInfo.completed && (
              <span className="text-success">
                téléchargement {nombreOfFilesDownloaded}/{fileNombre}
              </span>
            )}</>
            }
         
          </div>
        </div>
        <div className="col-12 mt-2">
            <ProgressBar
            variant="success"
            now={downloadInfo.progress}
            striped={true}
            label={`${downloadInfo.progress}%`}
          />
     
        </div>
      </div>
    </li> :<></> }

      <div className="steps-action">
        {current ===0&& (
          <Button key="submit" type="primary" loading={loading}  onClick={()=>confirmDeleteModal(param)}  >
          Désactiver
        </Button>
        )}
        {current === stepsModal.length - 2 && (
         <Button
         type="primary"
         loading={loading}
          onClick={()=>  ZipFolder(param)} 
         
       >
         Compresser
       </Button>

        )}
  {(current === stepsModal.length - 2) && (downloadInfo.progress=="Infinity")? 

<Button style={{ margin: '0 8px' }} onClick={() =>Annuler()}>
Annuler
</Button> : <></> }


        {current === stepsModal.length - 1 && (
          <>
         <Button
         type="primary"
         loading={loading}
           onClick={()=>  deleteParentFolderModal(param)}  
         
       >
         Supprimer
       </Button>
       <Button style={{ margin: '0 8px' }} onClick={() =>Annuler()}>
Annuler
</Button>  </>
        )}

        {current ==2 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Précédent
          </Button>
        )}
 {(current == 1) && (isNext) ?    <> <Button style={{ margin: '0 8px' }} onClick={() => next()}>
            Suivant
          </Button> 

<Button style={{ margin: '0 8px' }} onClick={() =>Annuler()}>
Annuler
</Button> </>
          : <></>}
      </div>   
            </Modal>
            <Modal
          visible={visibleModal}
          title={ `Attention` } 
          onCancel={handleCancelDelete}
          footer={null}
        >
     <h4>attestation le dossier {param?.paramParentFolderCompositeID?.parent} est en cours de suppression , vous devez completer la procedure de supression de dossier {param.paramParentFolderCompositeID.parent} </h4>
     <Button style={{ margin: '0 8px' }} onClick={() =>showModalOfDelete()}> continuer la suppression de {param.paramParentFolderCompositeID.parent} </Button>
     <Button style={{ margin: '0 8px' }} onClick={() =>{Annuler(), setVisibleModal(false)}}> Annuler  </Button>

            </Modal>
            <Modal
          visible={visibleBackUp}
          title={ "Backup" } 
          onCancel={handleCancelBackUp}
          footer={null}
        >
        {listDeleteParentFolderByClient.map((el, key) => <card parentFolder={el} key={key}>
          <div className='row' style={{marginTop: '10px' , marginBottom : '10px'}}>
                      <Input className='col-md-5 parent-folder-name ' value={el.paramParentFolderCompositeID.parent}
                             disabled={el.disabled}/> 
                      <div className='col-md-5 '>
                        <Radio.Group value={el.acceptMultipleFile} disabled={el.disabled}>
                          <Radio value={!value}>Unique</Radio>
                          <Radio value={!(!value)}>Multiple</Radio>
                        </Radio.Group>
                      </div>

             
                      <Upload {...props}  
                      showUploadList={false}
                           beforeUpload={() => false}
                           onChange={handleUpload_(el)}
                      accept=".zip">
    <i style={{marginRight: 25}} class="fas  fa-hdd cursorPointer" ></i>

  </Upload >
                      <div>
                         </div>

                    </div>
          </card>)}

<Form   ref={formBackUp} name="normal_add_document" onFinish={onFinish_}>
</Form>

          </Modal>
          
    </>
  );
}
export default User
