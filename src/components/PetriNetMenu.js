import React, { Component } from 'react';
import { Menu } from 'antd';

class PetriNetMenu extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(item) {
    this.props.onSelect(item.key);
  }

  render() {
    let petriNets = this.props.petriNets;
    let selectedId = this.props.selectedId;
    return (
      <Menu theme="dark" selectedKeys={['' + selectedId]} onClick={this.handleSelect}>
        {petriNets.map(petriNet =>
          <Menu.Item key={petriNet.id}>{petriNet.name}</Menu.Item>
        )}
      </Menu>
    );
  }
}

export default PetriNetMenu;
