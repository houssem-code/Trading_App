
import React, { useState, useContext, useEffect } from 'react'
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logoedm from '../../../../assets/img/logofinaln.png'
import ClientService from "../../../../services/client-service";

import { CloudOutlined } from '@ant-design/icons';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from '@mui/material/Typography';
import './Sidebar.css'

import StockageProgressBar from '../../views/StockageProgressBar';

import AuthentificationContext from '../../../../context/authentification-context';

function Sidebar({ color, image, routes }) {
  const [linkDisabled , setLinkDisabled ] = useState(false);




  /////pour filtrer ce qui va etre affiché
  const authentificationContext = useContext(AuthentificationContext);
  const role =authentificationContext.profile.authority

  const login = authentificationContext.profile.login;


  const userSideBarNames = ["Home","Profile","My Orders","Buy Crypto","Tutorial"]

  const adminSideBarNames = ["Home","Profile","User management","Tutorial Management","Notifications"]


  ///for client
  const [totalUsedStorage,setTotalUsedStorage] = useState();
  const [totalStorageSize,setTotalStorageSize] = useState();

  useEffect(() => {
    getClientFromLogin()
    

  }, [login]);


  const getClientFromLogin = () => {
      if (role === "USER"){

    ClientService.getClientFromLogin(login)
      .then((resp) => {
       setTotalStorageSize(resp.data.totalStorageSize)
       //setTotalUsedStorage((parseFloat(resp.data.totalUsedStorage)/(1024*1024)).toFixed(3))
       setTotalUsedStorage(resp.data.totalUsedStorage)
      })
      .catch((err) => {
        console.log(err);
      });
    
    
    }
  };












  const location = useLocation();


  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

 const handleClick = (e) => {
    if(linkDisabled) e.preventDefault()
}
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
            <img className="logo" src={logoedm}  alt=".logo" />
            </div>
          </a>
          
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect && role ==="USER" && userSideBarNames.includes(prop.name) ) 
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={handleClick} 
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            

            else if (!prop.redirect && role ==="ADMIN" && adminSideBarNames.includes(prop.name) ) 

            return (
              <li
                className={
                  prop.upgrade
                    ? "active active-pro"
                    : activeRoute(prop.layout + prop.path)
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleClick} 
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      {/* Espace de stockage*/}
      {role === "DELEGATE"?
      <>
        <hr style={{
            color: '#FFFFFF',
            backgroundColor: '#FFFFFF'      
        }} />
        
        {parseFloat(totalUsedStorage)/(1024*1024*1024) > 1 ? 
        <>
          <FormGroup style={{marginLeft:'40px',marginTop:'80px'}}>
          <FormControlLabel control={<CloudOutlined style={{ fontSize: '30px'}} />} label={<Typography sx={{ fontSize: 17,ml:1.9,mb:-0.5}}>Espace de stockage</Typography>} />
          </FormGroup>
          <StockageProgressBar percentage={(parseFloat(totalUsedStorage)/(1024*1024*1024)/(totalStorageSize)).toFixed(2)} />
          <div className='sousProgressBar' style={{marginLeft:'29px',marginTop:'-25px'}}>{(parseFloat(totalUsedStorage)/(1024*1024*1024)).toFixed(2) } Go utilisés sur {totalStorageSize} Go</div>
          </>:
          <>
          <FormGroup style={{marginLeft:'40px',marginTop:'80px'}}>
          <FormControlLabel control={<CloudOutlined style={{ fontSize: '30px'}} />} label={<Typography sx={{ fontSize: 17,ml:1.9,mb:-0.5}}>Espace de stockage</Typography>} />
          </FormGroup>
          <StockageProgressBar percentage={(parseFloat(totalUsedStorage)/(1024*1024*1024)/(totalStorageSize)).toFixed(2)} />
          <div className='sousProgressBar' style={{marginLeft:'29px',marginTop:'-25px'}}>{(parseFloat(totalUsedStorage)/(1024*1024)).toFixed(3) } Mo utilisés sur {totalStorageSize} Go</div>
          {/*<button onClick={() =>console.log((parseFloat(totalUsedStorage)/(1024*1024*1024)/(totalStorageSize)).toFixed(8))}>test</button>*/}
          </>
          
          }
          </>
        :<></>}
      </div>
    </div>
  );
}

export default Sidebar;
