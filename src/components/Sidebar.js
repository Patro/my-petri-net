import React, { Component } from 'react';
import { Layout } from 'antd';
import PetriNetMenuContainer from '../containers/PetriNetMenuContainer';
import Logo from './Logo';

const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    return (
      <Sider>
        <Logo />
        <PetriNetMenuContainer />
      </Sider>
    );
  }
}

export default Sidebar;
