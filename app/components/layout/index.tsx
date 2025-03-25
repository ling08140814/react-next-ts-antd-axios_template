'use client'
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation'
import type { MenuProps } from 'antd';
import Image from "next/image";
import '../../globals.css'

const { Header, Sider, Content } = Layout;

interface IProps {
  children?: React.ReactNode;
}

const App: React.FC<IProps> = ({ children }) => {
  const router = useRouter()
  const currentPath = usePathname()
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([currentPath])
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: '/home',
      icon: React.createElement(UserOutlined),
      label: '主页',
    },
    {
      key: '/about',
      icon: React.createElement(VideoCameraOutlined),
      label: '关于',
    },
    {
      key: '/test',
      icon: React.createElement(UploadOutlined),
      label: '测试',
    }
  ];

  const onMenuSelect = (item: any) => {
    router.push(item.key)
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='flex justify-center items-center h-[60px] text-white text-xl'>
          <Image
            className="dark:invert rounded-2xl"
            src="/logo.png"
            alt="logo"
            width={30}
            height={38}
            priority
          />
          {!collapsed && <div className='ml-2'>XXX系统</div>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          items={items}
          onSelect={onMenuSelect}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            height: 'calc(100vh - 112px)',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;