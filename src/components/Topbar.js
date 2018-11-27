import React, { Component } from 'react';
import { Layout } from 'antd';
import './Topbar.css';

const { Header } = Layout;

class Topbar extends Component {
  render() {
    return (
      <Header className="topbar" />
    );
  }
}

export default Topbar;
