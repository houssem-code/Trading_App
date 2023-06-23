import * as React from 'react';
import { useEffect, useState,useContext } from 'react'

import { Card, Col, Row, Button,Modal,Avatar,Form,Input} from 'antd';

import { EditOutlined, EllipsisOutlined, EyeOutlined,DeleteOutlined, IdcardFilled} from '@ant-design/icons';

import adminService from 'services/admin-Service';

import Notification from '../../shared/notification/Notification'

import './AdminTutorial.css'

import { ExclamationCircleOutlined,FolderAddTwoTone,FolderOpenFilled } from '@ant-design/icons';



export default function AdminTutorial() {

    const [tutorials, setTutorials] = useState([]);
    const [tutorial, setTutorial] = useState({});
    const [isModalDetailsVisible, setIsModalDetailsVisible] = useState(false);
    const [isModalDetailsVisibleConsult, setIsModalDetailsVisibleConsult] = useState(false);
    //const [tutorial, setTutorial] = useState([]);


    //////delete modal
    const { confirm } = Modal;

    const [form] = Form.useForm();

    const { Meta } = Card;

    useEffect(() => {
        getAllTutorials()
  
      },[])

      const deleteTutorial=(id) => {
        adminService.deleteTutorial(id).then(resp => {
          getAllTutorials()
          Notification('success', 'Tutorial Deleted', "")
        }).catch(err => {
          console.log(err)
        })
      }
      
      //Supprimer tutorial
  function showDeleteConfirm(id,title){
    confirm({
      title: 'Supprimer utilisateur ?',
      icon: <ExclamationCircleOutlined style={{color: '#FF4242'}}/>,
      content :'Toturial '+'"'+`${title}`+'"'+' will be deleted',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteTutorial(id);
        
      },
      onCancel() {
      },
    });
  }

      const handleCancelDetails = () => {
        setIsModalDetailsVisible(false);
        
      };
    
      const showModalDetails = (id) => {
        getTutorial(id)
        setIsModalDetailsVisible(true);
        
      };
      const handleCancelDetailsConsult = () => {
        setIsModalDetailsVisibleConsult(false);
        
      };
    
      const showModalDetailsConsult = (id) => {
        getTutorial(id)
        setIsModalDetailsVisibleConsult(true);
        
      };

      const getTutorial=(id) =>{
        adminService.getTutorial(id).then(resp => {
            setTutorial(resp.data)
        }).catch(err => {
          console.log(err)
        })
      }


      const getAllTutorials=()=>{
        adminService.getAllTutorials().then(resp =>{
            setTutorials(resp.data)
        }).catch(err => {
          console.log(err)
        })
    
      }

      const onFinish = values => {
    
        const newTutorial = {
          id : tutorial.id,
          title: values.title,
          content: values.content,
          details : values.details,
          path: values.path
        }
        console.log(newTutorial)
        adminService.updateTutorial(newTutorial).then(resp => {
          Notification('success', 'Tutorial Updated', "")
          getAllTutorials()
        }
    
        ).catch(err => {
          //setLoading(false)
          Notification('error', "Tutorial not Updated", '')
    
        })
    
      }

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
        <>
        
        <Row gutter={16}>
        {tutorials.map((row) => (
    <Col span={8}>
    <Card
    style={{ width: 300 }}
    cover={
      <img
        width="80" height="200"
        alt="example"
        src={row.path}
      />
    }
    actions={[
      <EyeOutlined  onClick={() =>showModalDetailsConsult(row.id)}/> ,
      <EditOutlined key="edit"  onClick={() =>showModalDetails(row.id)}/>,
      <DeleteOutlined onClick={() =>showDeleteConfirm(row.id,row.title)} />
    ]}
  >
    <Meta
      
      title={row.title}
      description={row.content}
    />
  </Card>
      
    </Col>))}
    {/*<button onClick={()=>console.log(console.log(tutorial))}>show</button>*/}
  </Row>


  <Modal title="Modify Tutorial" visible={isModalDetailsVisible}  onCancel={handleCancelDetails}
      className="modal-info" okButtonProps={{ style: { display: 'none' } }}           
                            cancelButtonProps={{ style: { display: 'none' } }} style={{ top: 50}}
                  
                >

<div className="row ">
<div className="cl-6">
   
      <>

      {(tutorial !== undefined) ? 
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
              
              <div >
                <div className="FormAppSubsc"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please add a Title.' }]}

                  >
                    <Input    placeholder="Title" />
                  </Form.Item>
                  <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please add a content.' }]}
                  >
                    <Input.TextArea  placeholder="Content" />
                    
                  </Form.Item>

                  <Form.Item
                    label="Details"
                    name="details"
                    rules={[{ required: true, message: 'Please add details.' }]}
                  >
                    <Input.TextArea  placeholder="Details" />
                    
                  </Form.Item>

                  <Form.Item
                      label="Image Path"
                      name="path"
                      rules={[{ required: true, message: 'Please add Image Path ! ' }]}
                  >
                    <Input   placeholder="Path"/>
                  </Form.Item>

                  <Form.Item shouldUpdate={true} >
                    <Button type="primary" htmlType="submit">
                      Modify
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






            </>
        
</div>


</div>

      </Modal>



{/* ******************************* ****************   Tutorial consultation ***************** **************** **************** */}




      <Modal title="Tutorial consultation" visible={isModalDetailsVisibleConsult}  onCancel={handleCancelDetailsConsult}
      className="modal-info1" okButtonProps={{ style: { display: 'none' } }}           
                            cancelButtonProps={{ style: { display: 'none' } }} style={{ top: 50}}
                  
                >


<div className="row ">
<div className="cl-6">
<h4 className="title-card" style={{textAlign: 'center'}} >Tutorial Informations</h4>
<div className="user-card user-infoS"  >
      {(tutorial !== undefined) ?
      <>

            <br></br>
            <div className="user-card-item">
                <label for="name"> Title :</label>
                 {/*<span className="client_info">{" "}{Document.fileName} </span>*/}
                 <span className="client_info">{tutorial.title}</span>
            </div>

            <div className="user-card-item">
                <label for="status"> Content :</label>
               {/*<span className="client_info">{" "}{Document.fileExtension}</span>*/}
               <span className="client_info">{tutorial.content}</span>
            </div>

            <div className="user-card-item">
                <label for="status"> Details :</label>
               <span className="client_info">{tutorial.details}</span>
            </div>
            
            <div className="user-card-item">
                <label for="status"> Image Path :</label>
               {/*<span className="client_info">{" "}{Document.fileExtension}</span>*/}
               <span className="client_info">{tutorial.path}</span>
            </div>
            
            
            
            </>:<></> }
        </div>
</div>


</div>

      </Modal>



        </>


        )

}