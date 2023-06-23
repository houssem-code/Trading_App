import * as React from 'react';
import { useEffect, useState,useContext } from 'react'
import './Orders.css'
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


    const [userOrders, setUserOrders] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amountInput, setAmountInput] = useState();
    const [viewOrders, setViewOrders] = useState(false);

    const { Meta } = Card;

    //user
    const [user, setUser] = useState();


    const authentificationContext = useContext(AuthentificationContext);

  //********** USE EFFECT ***********/
  useEffect(() => {

    getUserByLogin()

  },[authentificationContext.profile.login])

  useEffect(() => {
    getMyOrders()
    
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


  //********** USE EFFECT ***********/
  /**boucle for pour recuprer l'id et apres getOrderByID */
  const getMyOrders=()=>{
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
    setUserOrders(orders)
    }).catch(err => {
      console.log(err)
    })
    }
  }

  // getOrderById
  /*const getOrderById=(id)=>{
    adminService.getOrderById(id).then(resp =>{
      set
    }).catch(err => {
      console.log(err)
    })

  }*/






    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = async () => {
      const tokenAddress = "0xB65Cbcaa2C6BA58828e66803d621cd09A12a1b6d";
      const escrowAddress = "0x3088bF942e6997203cCc774D9EF6b739594A5683";
      //const web3 = new Web3(window.web3.currentProvider.enable());
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const Token = new web3.eth.Contract([
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ], tokenAddress);
      const Escrow = new web3.eth.Contract([
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "createOrder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ], escrowAddress);
      
      const amount = amountInput; // FIXME : get correct amount

    
      console.log("account : " + accounts[0]) // TODO: remove
      if(accounts[0] !== user.address) {
        return alert("connect with your account : " + user.address)
      } 
      

      await Token.methods.approve(
        escrowAddress,
        web3.utils.toWei(amount.toString())
      ).send({
        from:accounts[0]
      });

      await Escrow.methods.createOrder(
        web3.utils.toWei(amount.toString()).toString()
      ).send({
        from:accounts[0]
      });

      alert("success !")

      // TODO: show success msg
      setIsModalOpen(false);
      getMyOrders()
      setViewOrders(!viewOrders)
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);

    };

    const completeOrder = (id) => {
      AdminService.completeOrder(id).then(resp => {
        window.location.reload(); 
      })
        .catch(err => {
          console.log(err)
        })
    };

    const cancelOrder = (id) => {
      AdminService.cancelOrder(id).then(resp => {
        window.location.reload(); 
      })
        .catch(err => {
          console.log(err)
        })
    };

    return(
        <>
        
        {(userOrders.length !== 0)  ?
        <Row gutter={16}>
        {userOrders.map((row) => (
    <Col span={8}>
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <ButtonMui color="success" disabled={row.status=="Pending" ? false : true} onClick={()=>completeOrder(row.id)}>Complete Order</ButtonMui>,
          <ButtonMui type="warning"  disabled={row.status == "Open" ? false : true} onClick={()=>cancelOrder(row.id)}>Cancel Order</ButtonMui>

          
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
        View orders
      </Button>
      
      <Button type="primary" onClick={showModal}>
        Create order
      </Button>

      <Modal title="Create Order" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Create">
      <Input placeholder="Amount" value={amountInput} onChange={e =>  setAmountInput(e.target.value)}   />
      </Modal>

      



</>

        )

}