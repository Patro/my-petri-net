import React, { Component } from 'react';
import { Button } from 'antd';
import Toolbar from './Toolbar';

class SimulatorToolbar extends Component {
  render() {
    return (
      <Toolbar backgroundColor="#008B27">
        <Button id="reset" icon="reload" onClick={this.props.onReset}>Reset</Button>
      </Toolbar>
    )
  }
}

export default SimulatorToolbar;
