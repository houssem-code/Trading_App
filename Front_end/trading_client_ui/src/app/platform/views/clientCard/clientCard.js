import React, { Component } from "react";// react-bootstrap components


import { Form, Input, Button, Avatar, Card } from 'antd';

import {
    Modal,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import './clientCard.css'
import image from '../../../../assets/img/talan-covoiturage.png'
const { Meta } = Card;
class ClientCard extends Component {


    render() {
        return (
            <>

                <Container fluid>
                    <div className="site-card-border-less-wrapper">
                        <Card bordered={true} className="cardClient">
                            <div className="avatar" >
                                <Meta
                                    avatar={
                                        <Avatar
                                            icon="user"
                                            shape="circle"
                                            size={50}

                                        />
                                    }
                                    title="Application RH"
                                />
                                <div className="buttonsDiv">
                                <Button className="buttonEdit"><i class="fas fa-edit"></i> Edit</Button>
                                    <Button className="buttonInfo"><i class="fas fa-info-circle"></i> Info</Button>
                                    <Button className="buttonManager"><i class="fas fa-user-cog"></i> Manager</Button>
                                    {/* <Button className="buttonDisable"> <i class="far fa-stop-circle"></i>Deactivate</Button> */}
                                </div>
                            </div>
                            <hr></hr>
                            <div className="infoClient">
                                <div className="items">
                                    <i class="fas fa-envelope"> </i> kilaniameni2@gmail.com
                                </div>
                                <div className="items">
                                    <i class="fas fa-calendar-alt">  </i> 27-04-2021
                                </div>
                                <div className="items">
                                    <i class="fas fa-cloud-upload-alt">  </i> 25 Go
                                </div>
                                <div className="items">
                                <i class="far fa-image"></i>
                            

                                </div>
                            </div>
                        </Card>
                        <Card bordered={true} className="cardClient">
                            <div className="avatar2" >
                            <div className="avatar2-meta" >

                                <Meta
                                    avatar={
                                        <Avatar
                                            shape="circle"
                                            size={50}
                                             src={image}
                                        />
                                    }
                                    title="Covoiturage"
                                />
</div>
                                <div className="buttonsDiv">

                                    <Button className="buttonEdit"><i class="fas fa-edit"></i> Edit</Button>
                                    <Button className="buttonInfo"><i class="fas fa-info-circle"></i> Info</Button>
                                    <Button className="buttonManager"><i class="fas fa-user-cog"></i> Manager</Button>
                                    {/* <Button className="buttonable"><i class="fas fa-play-circle"></i> activate </Button> */}
                                </div>                            </div>

                            <hr></hr>
                            <div className="infoClient">
                                <div className="items">
                                    <i class="fas fa-envelope"> </i> kilaniameni2@gmail.com
                                </div>
                                <div className="items">
                                    <i class="fas fa-calendar-alt">  </i> 27-04-2021
                                </div>
                                <div className="items">
                                    <i class="fas fa-cloud-upload-alt">  </i> 25 Go
                                </div>
                                <div className="items">
                                <i class="fas fa-spinner"></i>14 Go
                                </div>
                            </div>
                        </Card>
                        {/* <Card bordered={true} className="cardClient">
                            <div className="avatar3" >
                            <div className="avatar3-meta" >

                                <Meta
                                    avatar={
                                        <Avatar
                                            icon="user"
                                            shape="circle"
                                            size={50}

                                        />
                                    }
                                    title="Application RH"
                                />
                                <Button shape="circle" className="activ" size={10}><i class="far fa-play-circle"></i></Button>
</div>
                                <div className="buttonsDiv">

                                    <Button className="buttonDisable"><i class="fas fa-edit"></i> Edit</Button>
                                    <Button className="buttonDisable"><i class="fas fa-info-circle"></i> Info</Button>
                                    <Button className="buttonDisable"><i class="fas fa-user-cog"></i> Manager</Button>
                                </div>                            </div>

                            <hr></hr>
                            <div className="infoClient">
                                <div className="items">
                                    <i class="fas fa-envelope"> </i> kilaniameni2@gmail.com
                                </div>
                                <div className="items">
                                    <i class="fas fa-calendar-alt">  </i> 27-04-2021
                                </div>
                                <div className="items">
                                    <i class="fas fa-cloud-upload-alt">  </i> 25 Go
                                </div>
                                <div className="items">
                                    <i class="fas fa-cloud-upload-alt">  </i> 14 Go
                                </div>
                            </div>
                        </Card> */}
                    </div>


                </Container>
            </>

        );
    }
}
export default ClientCard;
