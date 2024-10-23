import React from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'antd';

const AuthLayout = () => {
    return (
        <>
            <Row
                gutter={[0, 0]}
                style={{ height: '100vh', margin: 0, padding: 0 }}
            >
                <Col
                    xs={24}
                    sm={24}
                    md={18}
                    lg={18}
                    xl={18}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        minHeight: '100%', 
                        boxSizing: 'border-box'
                    }}
                >
                    <div style={{ minWidth: "50%", textAlign: 'center' }}>
                        <h2>Auth Layout</h2>
                        <Outlet />
                    </div>
                </Col>
                <Col
                    xs={0}
                    sm={0}
                    md={6} 
                    lg={6}
                    xl={6}
                    style={{ padding: 0, margin: 0 }} 
                >
                    <div style={{ width: "100%", height: "100vh", backgroundColor: 'lightBlue' }}>
                        
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default AuthLayout;
