import React, { Component } from 'react';
import { Layout } from 'antd';
import './GraphArea.css';

const { Content } = Layout;

class GraphArea extends Component {
  render() {
    return (
      <Content className="graph_area">
        {this.props.children}
      </Content>
    )
  }
}

export default GraphArea;
