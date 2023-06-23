import * as React from 'react';
import { useEffect, useState,useContext } from 'react'
import Web3 from "web3";

import AuthentificationContext from '../../../context/authentification-context'

import { Button,Modal,Input} from 'antd';

import AdminService from '../../../services/admin-Service'

import { EditOutlined, EllipsisOutlined,DislikeOutlined,LikeOutlined, SettingOutlined } from '@ant-design/icons';

import { Avatar } from 'antd';

import ButtonMui from '@mui/material/Button';



import InputLabel from '@mui/material/InputLabel';


import { Card, Col, Row } from 'antd';

export default function orders() {


    const [allOrders, setAllOrders] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amountInput, setAmountInput] = useState();
    const [viewOrders, setViewOrders] = useState(false);

    const { Meta } = Card;

    //user
    const [user, setUser] = useState();


    const authentificationContext = useContext(AuthentificationContext);

  //********** USE EFFECT ***********/
  useEffect(() => {
    //getAllUsers()
    getUserByLogin()

  },[authentificationContext.profile.login])

  useEffect(() => {
    getAllOrders()
    
  },[user])


  const getUserByLogin = (login) => {
    login = authentificationContext.profile.login
    AdminService.getUserByUsername(login).then(resp => {
      setUser(resp.data)
    })
      .catch(err => {
        console.log(err)
      })
  };

/*get all orders */
const getAllOrders=()=>{
    if (user !== undefined) {
    console.log(user.username)
    const orders = []
    AdminService.getAllUsers().then(resp =>{
        for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].username !== user.username ) {
                console.log("hello")
                if (resp.data[i].address !== undefined){
                    //console.log(resp.data[i].address)
                    //return user orders
                    AdminService.getMyOrders(resp.data[i].address).then(response =>{
                        const ordersIds =  response.data.orders
                        console.log(ordersIds)
                        for (let i = 0; i < ordersIds.length; i++) {
                          AdminService.getOrderById(ordersIds[i]).then(orderResponse =>{
                            const newOrder = {
                              id : ordersIds[i],
                              amount: orderResponse.data.order.amount,
                              seller: orderResponse.data.order.seller,
                              buyer : orderResponse.data.order.buyer,
                              status: orderResponse.data.order.status
                            } 
                            if (newOrder.status !== "Cancelled" && newOrder.status !== "Sold") {
                            //orders.push(resp.data.order)
                            orders.push(newOrder)}
                        }).catch(err => {
                          console.log(err)
                        })
                      }
                      setAllOrders(orders)
                      }).catch(err => {
                        console.log(err)
                      })

                }

            }
        }
      }).catch(err => {
        console.log(err)
      })
    }
    }














  //********** USE EFFECT ***********/
  /**boucle for pour recuprer l'id et apres getOrderByID */
  /*const getUserOrders=()=>{
    if (user !== undefined) {
    AdminService.getMyOrders(user.address).then(resp =>{
      const ordersIds =  resp.data.orders
      const orders = []
      for (let i = 0; i < ordersIds.length; i++) {
        AdminService.getOrderById(ordersIds[i]).then(resp =>{
          const newOrder = {
            id : ordersIds[i],
            amount: resp.data.order.amount,
            seller: resp.data.order.seller,
            buyer : resp.data.order.buyer,
            status: resp.data.order.status
          } 
          if (newOrder.status !== "Cancelled") {
          //orders.push(resp.data.order)
          orders.push(newOrder)}
      }).catch(err => {
        console.log(err)
      })
    }
    //setUserOrders(orders)
    }).catch(err => {
      console.log(err)
    })
    }
  }*/

  // getOrderById
  /*const getOrderById=(id)=>{
    adminService.getOrderById(id).then(resp =>{
      set
    }).catch(err => {
      console.log(err)
    })

  }*/




    

    const buyRequest = (id) => {
      AdminService.buyRequest(id,user.address).then(resp => {
        window.location.reload(); 
      })
        .catch(err => {
          console.log(err)
        })
    };

    const cancelBuyRequest = (id) => {
      AdminService.cancelBuyRequest(id).then(resp => {
        window.location.reload(); 
      })
        .catch(err => {
          console.log(err)
        })
    };

    return(
        <>
        
        {(allOrders.length !== 0)  ?
        <Row gutter={16}>
        {allOrders.map((row) => (
    <Col span={8}>
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <ButtonMui color="success" disabled={row.status=="Open" ? false : true} onClick={()=>buyRequest(row.id)}>Buy request</ButtonMui>,
          <ButtonMui type="warning"  disabled={row.status == "Pending" ? false : true} onClick={()=>cancelBuyRequest(row.id)}>Cancel buy request </ButtonMui>

          
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          }
          title={"Amount : " + row.amount}
          description={"Status : " + row.status}
        />
        
      </Card>
      
    </Col>
    ))}
        </Row>:<></>}
        
        
      
      <br/>
      <br/>
      
      <Button type="primary" onClick={()=>setViewOrders(!viewOrders)}>
        View all orders
      </Button>
      

</>

        )

}