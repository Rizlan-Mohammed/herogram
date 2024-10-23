import React from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'antd';
import NavBar from '../components/NavBar';

const AppLayout = () => {
    return (
        <>
            <Row>
                <Col span={4}>
                    <NavBar />
                </Col>
                <Col span={18}>
                    <Outlet />
                </Col>
            </Row>
        </>
    );
}

export default AppLayout;
