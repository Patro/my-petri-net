import React, { Component } from 'react';
import { Button, Input } from 'antd';
import './CreateBox.css';

class CreateBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }
  }

  handleClickOnPlus = () => {
    this.props.onCreate(this.state.value);
    this.setState({ value: '' })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    let button = <Button type="default" icon="plus" onClick={this.handleClickOnPlus} />
    return (
      <div className="create_box">
        <Input placeholder="Name" value={this.state.value} onChange={this.handleChange} suffix={button} />
      </div>
    )
  }
}

export default CreateBox;
