import React, { Component } from 'react';
import { Layout } from 'antd';
import './Toolbar.css';

const { Header } = Layout;

class Toolbar extends Component {
  render() {
    return (
      <Header className="toolbar" style={{ backgroundColor: this.props.backgroundColor }}>
        {this.props.children}
      </Header>
    )
  }
}

export default Toolbar;
