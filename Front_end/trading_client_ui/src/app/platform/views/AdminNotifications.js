import * as React from 'react';
import { useEffect, useState,useContext } from 'react'

import { Card, Col, Row,Modal,Form,Input,InputNumber} from 'antd';


import AuthentificationContext from '../../../context/authentification-context'


import AdminService from '../../../services/admin-Service'

import Button from '@mui/material/Button';




export default function AdminNotifications() {
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

    
  
   

    
    const getAllPosts=()=> {
      const acceptedPosts = []
      AdminService.getAllPosts().then(resp => {
        for (let i = 0; i < resp.data.length; i++) {
          if (resp.data[i].accepted ==0) {
            acceptedPosts.push(resp.data[i])
          }
        }
        setPosts(acceptedPosts)
      })
        .catch(err => {
          console.log(err)
        })
  
    };

    const deletePost=(id)=>{
        AdminService.deletePost(id).then(resp => {
        getAllPosts()    
        }).catch(err => {
            console.log(err)
          })
    }

    const acceptPost=(id)=>{
        AdminService.acceptPost(id).then(resp => {
        getAllPosts()
        }).catch(err => {
            console.log(err)
          })
    }
    
    return(
        <>
<div  style={{paddingLeft: 290}} >
<table aria-label="custom pagination table" style={{'width':'70%'}} class="centrer" >
      <thead>
        <tr>
          <th className='thAdmin' style={{textAlign:"center"}}></th>            
          <th className='thAdmin' style={{textAlign:"center"}}></th>

        </tr>
      </thead>
      <tbody>

      {posts.map((row) => (
          <tr >
            <td  >
              <div>
                    <Card title={"User: " + row.utilisateur} bordered={false}>
                    {row.content}
        
                    </Card>
              </div>
            </td> 
            <td  align="center">
              <p><Button onClick={()=>acceptPost(row.id)} variant="contained" color="success">Accept </Button></p>
              <p><Button onClick={()=>deletePost(row.id)}variant="contained" color="error">Decline </Button></p>
            </td>
          </tr>))}
          
      </tbody>
      <br/>
      
      

    </table>
    </div>








        </>


        )

}