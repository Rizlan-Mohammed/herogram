import React, { useState } from 'react';
import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: 'Dashboard',
  },
  {
    key: '2',
    icon: <LoginOutlined />,
    label: 'Logout',
  },
];

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate(); 

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    if (e.key === '2') {
      sessionStorage.clear();
      navigate('/');
    }
  };

  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          margin: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        style={{
            height: "85vh"
        }}
        onClick={handleMenuClick} 
      />
    </div>
  );
};

export default NavBar;
