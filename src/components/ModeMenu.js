import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Menu } from 'antd';
import './ModeMenu.css';

class ModeMenu extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(item) {
    this.props.history.push(`${item.key}`);
  }

  render() {
    return (
      <Menu className="mode_menu"
            mode="horizontal"
            onClick={this.handleSelect}
            selectedKeys={[this.selectedMode()]}
            theme="dark">
        <Menu.Item className="mode_menu__edit" key="edit">
          <Icon theme="outlined" type="edit" />Edit
        </Menu.Item>
        <Menu.Item className="mode_menu__simulate" key="simulate">
          <Icon theme="outlined" type="play-circle" />Simulate
        </Menu.Item>
      </Menu>
    );
  }

  selectedMode() {
    return this.props.match.params.mode;
  }
}

export default withRouter(ModeMenu);
