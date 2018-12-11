import React, { Component } from 'react';
import { Layout } from 'antd';
import ModeMenu from './ModeMenu';
import './Topbar.css';

const { Header } = Layout;

class Topbar extends Component {
  render() {
    return (
      <Header className="topbar">
        <ModeMenu />
      </Header>
    );
  }
}

export default Topbar;
