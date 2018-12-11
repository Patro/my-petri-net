import React, { Component } from 'react';
import { Layout } from 'antd';
import CreateBoxContainer from '../containers/CreateBoxContainer';
import PetriNetMenuContainer from '../containers/PetriNetMenuContainer';
import Logo from './Logo';

const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    return (
      <Sider>
        <Logo />
        <CreateBoxContainer />
        <PetriNetMenuContainer />
      </Sider>
    );
  }
}

export default Sidebar;
