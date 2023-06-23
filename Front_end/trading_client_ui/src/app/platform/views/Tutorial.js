import * as React from 'react';
import { useEffect, useState,useContext } from 'react'

import { Card, Col, Row, Button,Modal,Avatar,Form,Input} from 'antd';

import { EditOutlined, EllipsisOutlined, EyeOutlined,DeleteOutlined, IdcardFilled} from '@ant-design/icons';

import adminService from 'services/admin-Service';

import Notification from '../../shared/notification/Notification'

import './AdminTutorial.css'

import { ExclamationCircleOutlined,FolderAddTwoTone,FolderOpenFilled,PlayCircleOutlined } from '@ant-design/icons';



export default function Tutorial() {

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
      
      <PlayCircleOutlined style={{fontSize: '30px'}} onClick={() =>showModalDetailsConsult(row.id)} />
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


  



{/* ******************************* ****************   Tutorial consultation ***************** **************** **************** */}




      <Modal title={tutorial.title} visible={isModalDetailsVisibleConsult}  onCancel={handleCancelDetailsConsult}
      className="modal-info1" okButtonProps={{ style: { display: 'none' } }}           
                            cancelButtonProps={{ style: { display: 'none' } }} style={{ top: 50}}
                  
                >


<div className="row ">
<div className="cl-6">
<h4 className="title-card" style={{textAlign: 'center'}} >Tips</h4>
<div className="user-card user-infoS"  >
      {(tutorial !== undefined) ?
      <>
            
            
            <br></br>
            <div className="user-card-item">
                
                 {/*<span className="client_info">{" "}{Document.fileName} </span>*/}
                 <span className="client_info">{tutorial.details}</span>
            </div>

            </>:<></> }
        </div>
</div>


</div>

      </Modal>



        </>


        )

}