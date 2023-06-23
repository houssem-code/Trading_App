import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { useHistory, NavLink } from "react-router-dom";
import { UserOutlined, LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined, PoweroffOutlined } from '@ant-design/icons';
import logo from '../../../assets/img/edmlogofianln.png'
import './Register.css'
import Zoom from 'react-reveal/Zoom';
import AdminService from '../../../services/admin-Service'
import Notification from '../../shared/notification/Notification'
import { mailTalanValidator } from '../../../constant/Talan-mail-constant'

export default function Register() {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [userLoginExist, setUserLoginExist] = useState(false);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const onFinish = values => {

        setLoading(true)
        const newUser = {
            email: values.email,
            firstname: values.firstname,
            lastname: values.lastname,
            address : values.address,
            password: values.password,
            username: values.username,
            appUserRoles : ["ROLE_USER"]
        }
        console.log(newUser)
        AdminService.register(newUser).then(resp => {
            console.log(resp.data)
            setLoading(false)
            //history.push({ pathname: "/login" })
            Notification('success', 'Registration successful.', "You can jave access to login.")

        }

        ).catch(err => {
            Notification('error', "Registration error.", 'Please try again. ')
            setLoading(false)
        })

    }
 
    const IsUserLoginExist = (rule, value, callback) => {

        if (value) {

                AdminService.getUserByUsername(value.toLowerCase().trim()).then(resp => {
                    if (resp.data) {
                    callback("The username already exists. ");
                    }
                    callback();

                })
                    .catch(err => {
                        console.log(err)
                    })
            }

            
        

        else callback();
    }

    const IsUserEmailExist = (rule, value, callback) => {

        if (value) {

            
            AdminService.getUserByEmail(value.toLowerCase().trim()).then(resp => {
                if (resp.data) {
                callback("The email already exists ");
                }
                    callback();
            })
                .catch(err => { console.log(err)
                })
            

            
        }

        else callback();
    }

    return (
        <Zoom >

            <Form form={form} name="normal_register" className="register-form" onFinish={onFinish}>
                <img className="logo" src={logo} alt=".logo" />
                <Form.Item
                    name="username"
                    rules={[

                        {
                            required: true,
                            message: 'What is your username?',
                         },
                        {
                             //validator: IsUserLoginExist,

                        }


                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    rules={[{
                        required: true,
                        message: 'What is your lastname? ?',

                    }
                    ]}
                >
                    <Input prefix={<i className="far fa-address-card" ></i>} placeholder="Lastname " />
                </Form.Item>
                <Form.Item
                    name="firstname"
                    rules={[{ required: true, message: 'What is your firstname?' }]}
                >
                    <Input prefix={<i className="far fa-address-card" ></i>} placeholder="Firstname" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'What is your email address?' }
                        ,
                     {
                         //validator: IsUserEmailExist,

                 }
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="address"
                    rules={[{ required: true, message: 'What is your address?' }
                        
                     
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="MetaMaskAddress" />
                </Form.Item>
                
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please add a password." }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Verify if the passwords are identical');
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm Password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <div className="login-register-container">
                    <Form.Item shouldUpdate={true} className="register_submit_button">
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                icon={<UserAddOutlined />}

                            >
                                Sign up
                            </Button>
                        )}
                    </Form.Item>
                    <span className="register">  <NavLink to="/login"  > Do you already have an account? Log in </NavLink> </span>
                </div>
            </Form>
        </Zoom>
    )
}
