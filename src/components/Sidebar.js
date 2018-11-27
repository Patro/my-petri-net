import React, { Component } from 'react';
import { Layout } from 'antd';
import Logo from './Logo';

const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    return (
      <Sider>
        <Logo />
      </Sider>
    );
  }
}

export default Sidebar;
