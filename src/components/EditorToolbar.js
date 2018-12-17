import React, { Component } from 'react';
import { Radio } from 'antd';
import * as nodeType from '../constants/nodeTypes';
import Toolbar from './Toolbar';

class EditorToolbar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.props.onNodeTypeChange(event.target.value);
  }

  render() {
    let activeNodeType = this.props.activeNodeType;
    return (
      <Toolbar backgroundColor="darkred">
        <Radio.Group value={activeNodeType} onChange={this.handleChange} buttonStyle="solid">
          <Radio.Button value={nodeType.TRANSITION}>
            Transition
          </Radio.Button>
          <Radio.Button value={nodeType.PLACE}>
            Place
          </Radio.Button>
        </Radio.Group>
      </Toolbar>
    )
  }
}

export default EditorToolbar;
