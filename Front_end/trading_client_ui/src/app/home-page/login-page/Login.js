import React, { useState, useContext } from 'react'
import { Form, Input, Button } from 'antd';
import { useHistory, NavLink } from "react-router-dom";
import { UserOutlined, LockOutlined, PoweroffOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import logo from '../../../assets/img/edmlogofianln.png'
import './Login.css'
import Zoom from 'react-reveal/Zoom';
import { saveAuthToken } from '../../../services/localStorage-service'
import AuthentificationContext from '../../../context/authentification-context'
import AdminService from '../../../services/admin-Service'
import Notification from '../../shared/notification/Notification'

export default function Login() {

    const authentificationContext = useContext(AuthentificationContext);
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    const onFinish = values => {

        setLoading(true)
        let userCredential = {
            login: values.username,
            password: values.password
        }

        AdminService.authenticate(userCredential.login,userCredential.password).then(resp => {

            saveAuthToken(resp.data)
            setLoading(false)
            history.push({ pathname: "/admin/user" })
            authentificationContext.logIn()
            Notification('success', 'Authentication successful.', 'Welcome to CRYPTOPHILA')

            
        }

        ).catch(error => {

            let err = { ...error }
            console.log("hello" + error)
            if (err.response) {
               
                 Notification('error', "Authentication error.", 'Please check your username or password.')             
                      setLoading(false)
                
            }

            else {
                Notification('error', "Server error.", 'Please try again later.')
                setLoading(false)
            }
        })

    }

    return (


        <Zoom >

            <Form form={form} name="normal_login" className="login-form" onFinish={onFinish}>
                <img className="logo" src={logo} alt=".logo" />
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'What is your username?' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'What is your password?' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password."
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <div className="login-register-container">
                    <Form.Item shouldUpdate={true} className="login_submit_button">
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<PoweroffOutlined />}
                                loading={loading}
                            >
                                Log in.
                            </Button>
                        )}
                    </Form.Item>
                    <span className="register">  <NavLink to="/register"  > Not a user yet ? Sign up.  </NavLink> </span>
                </div>
            </Form>
        </Zoom>

    )
}
