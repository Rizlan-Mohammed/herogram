import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthenticationUI = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); 

    const validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Passwords do not match!'));
        },
    });

    const handleFinish = async (values) => {
        try {
            let response;
            if (isLogin) {
                response = await axios.post(`${process.env.REACT_APP_BaseUrl}/api/users/login`, {
                    email: values.email,
                    password: values.password,
                });
            } else {
                response = await axios.post(`${process.env.REACT_APP_BaseUrl}/api/users/register`, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                });
            }

            // Save token to session storage
            const token = response.data.token; // Assuming the token is in response.data.token
            sessionStorage.setItem('token', token);

            message.success(response.data.message); // Handle successful login or registration
            console.log('Success:', response.data);

            // Redirect to the dashboard
            navigate('/dashboard'); // Replace with your dashboard route
        } catch (error) {
            message.error(error.response?.data?.message || 'Something went wrong'); // Handle errors
        }
    };

    return (
        <Form 
            layout="vertical" 
            name="auth-form"
            onFinish={handleFinish}
        >
            <Form.Item 
                name="email" 
                label="Email" 
                rules={[
                    { required: true, message: 'Please input your email' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input prefix={<MailOutlined />} />
            </Form.Item>

            {!isLogin && (
                <>
                    <Form.Item 
                        name="firstName" 
                        label="First Name" 
                        rules={[{ required: true, message: 'Please input your first name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        name="lastName" 
                        label="Last Name" 
                        rules={[{ required: true, message: 'Please input your last name' }]}
                    >
                        <Input />
                    </Form.Item>
                </>
            )}
            
            <Form.Item 
                name="password" 
                label="Password" 
                rules={[{ required: true, message: 'Please input your password' }]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            {!isLogin && (
                <Form.Item 
                    name="confirmPassword" 
                    label="Confirm Password" 
                    dependencies={['password']} 
                    hasFeedback 
                    rules={[
                        { required: true, message: 'Please confirm your password' },
                        validateConfirmPassword, 
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
            )}

            <Form.Item>
                <Button 
                    type="link" 
                    style={{ float: 'right', padding: 0, margin: 0 }}
                    onClick={() => setIsLogin((prev) => !prev)}
                >
                    {isLogin ? 'Register new user?' : 'Already have an account?'}
                </Button>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    {isLogin ? 'Sign In' : 'Register'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AuthenticationUI;
