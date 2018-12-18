import React, { Component } from 'react';
import { Layout } from 'antd';
import Delayed from './Delayed';
import './GraphArea.css';

const { Content } = Layout;

class GraphArea extends Component {
  render() {
    return (
      <Content className="graph_area">
        <Delayed>
          {this.props.children}
        </Delayed>
      </Content>
    )
  }
}

export default GraphArea;
