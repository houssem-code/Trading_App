import * as React from 'react';
import { useEffect, useState,useContext } from 'react'

import { Card, Col, Row, Button,Modal,Form,Input,InputNumber} from 'antd';


import AuthentificationContext from '../../../context/authentification-context'


import AdminService from '../../../services/admin-Service'




export default function home() {
    const [ordersList, setordersList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [posts, setPosts] = useState([]);

    const authentificationContext = useContext(AuthentificationContext);


    useEffect(() => {
      getAllPosts()

  
    },[])

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    
    const getAllPosts=()=> {
      const acceptedPosts = []
      AdminService.getAllPosts().then(resp => {
        for (let i = 0; i < resp.data.length; i++) {
          if (resp.data[i].accepted ==1) {
            acceptedPosts.push(resp.data[i])
          }
        }
        setPosts(acceptedPosts)
      })
        .catch(err => {
          console.log(err)
        })
  
    };

      const onFinish = (values) => {
        if (values.description !== undefined){
        const newpost = {

          utilisateur:authentificationContext.profile.login,
          content:values.description
  
        } 
        console.log(newpost)
        AdminService.createPost(newpost).then(resp => {
          //getAllPosts()
        })
          .catch(err => {
            console.log(err)
          })

      }};

    return(
        <>
        <div style={{paddingLeft: 200}}>
<Form 
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600 ,}}

  >

    <Form.Item name="description" label="Description">
      <Input.TextArea placeholder='Write your post' size='large' name='description' />
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>









        <Row   gutter={16}>
        {posts.map((row) => (
    <Col span={8}>
      <Card   title={"User: " + row.utilisateur} bordered={false}>
        {row.content}
        
      </Card>
      
    </Col>))}
    
  </Row>

    </div>
        </>


        )

}