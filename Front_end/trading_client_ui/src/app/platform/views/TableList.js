import React, { useState, useEffect } from 'react'
// react-bootstrap components


import { Form, Input, Button, Table, Card } from 'antd';
import { UserOutlined, LockOutlined, CloudUploadOutlined, EyeInvisibleOutlined, EyeTwoTone, AppstoreOutlined } from '@ant-design/icons';

import {
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import AdminService from '../../../services/admin-Service.js'
import './TableList.css';
import ClientCard from './clientCard/clientCard.js'
export default function TableList() {
  const [form] = Form.useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const columns = [
    {
      dataField: "application",
      dataIndex: "application",
      key: "application",
      title: "Client Name"
    },
    {
      dataField: "usersNumber",
      dataIndex: "usersNumber",
      key: "usersNumber",
      title: "Users Number"
    },
    {
      dataField: "totalStorageSize",
      dataIndex: "totalStorageSize",
      key: "totalStorageSize",
      title: "Size Allocated"
    },
    {
      dataField: "totalUsedStorage",
      dataIndex: " totalUsedStorage",
      key: "totalUsedStorage",
      title: "Size Used"
    }
  ];
  useEffect(() => {

    getAllClients();
  }, [])

  const getAllClients = () => {

    AdminService.getAllClients().then(resp => {

      let users = resp.data.map(user => ({

        id: user.id,
        application: user.application,
        totalStorageSize: 25,
        totalUsedStorage: 10,
        usersNumber: 5,

      }))
      console.log(resp.data)
      setUsers(users)

    }).catch(err => {

    })

  }

  const Subscribe = values => {

    const newClient = {
      application: values.application,
      login: values.login,
      password: values.password,
      totalStorageSize: values.totalStorageSize,
    }

    AdminService.subscribeClient(newClient).then(resp => {

      setShow(false)
      getAllClients()
      setUsers(users)

    }

    ).catch(err => {

    })

  }
  return (
    <>
      {/* <Container fluid>
        <Row>

          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header  >
                <div className="search">
                  <div className="input-search"  >
                    <Input
                      type="search"
                      className="user-search-input"
                      placeholder="Search Client"

                    />                  </div>
                  <div className="search-button">
                    <Button
                    type="primary" className="Button" onClick={handleShow}><i class="fas fa-plus-circle"></i></Button>{' '}
                  </div></div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table keyField="application" className="table-hover" hover
                  columns={columns}
                  dataSource={users}
                />


              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      <Modal show={show} onHide={handleClose} className="Modal-Subscribe">
        <Modal.Header closeButton>
          {/* <Modal.Title>Subscribe Client</Modal.Title> 
        </Modal.Header>
        <Form form={form} name="normal_register" className="register-form" onFinish={Subscribe}>

          <Modal.Body>

            <Form.Item
              name="application"
              rules={[{ required: true, message: 'Quel est le Nom de client?' }]}
            >
              <Input prefix={<AppstoreOutlined className="site-form-item-icon" />} placeholder=" Client Name" />
            </Form.Item>
            <Form.Item
              name="login"
              rules={[{
                required: true,
                message: 'Quel est l\'identifiant de client ?',

              }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Identifiant" />
            </Form.Item>


            <Form.Item
              name="password"
              rules={[{ required: true, message: "merci d'ajouter un mot de passe !" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mot de passe"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item
              name="totalStorageSize"
              rules={[{ required: true, message: 'Combien d\'espace à allouer pour le client?' }]}
            >
              <Input prefix={<CloudUploadOutlined className="site-form-item-icon" />} placeholder=" Size allocated" />
            </Form.Item>



          </Modal.Body>
          <Modal.Footer>
              <Form.Item shouldUpdate={true} className="register_submit_button">
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    Subscribe
                            </Button>

                )}
              </Form.Item>
          </Modal.Footer>
        </Form>

      </Modal>
    */}
      <Container fluid>
          <Card className="searchCard" bordered={false} >
            <div className="divsearchCard">
              <Input type="search" className="inputSearch" placeholder="Client Name" />
              <div className="search-button">
                <Button shape="circle"
                  className="Button"  onClick={handleShow}><i class="fas fa-search"></i></Button>{' '}
                <Button
                  type="primary" className="Button" shape="circle" onClick={handleShow}><i class="fas fa-plus-circle"></i></Button>{' '}
              </div>
            </div>
          </Card>
          <Card className="cardsCont">
            <ClientCard  />
          </Card>



      </Container>
    </>

  );
}

