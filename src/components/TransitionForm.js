import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

class TransitionForm extends Component {
  constructor(props) {
    super(props);

    this.handleLabelChange = this.handleLabelChange.bind(this);
  }

  handleLabelChange(event) {
    this.props.onLabelChange(event.target.value);
  }

  render() {
    return (
      <>
        <h2>Transition</h2>
        <Form layout="vertical">
          <Form.Item label="Label">
            <Input id="label"
                   value={this.props.label}
                   onChange={this.handleLabelChange}/>
          </Form.Item>
          <Form.Item>
            <Button id="delete"
                    type="danger"
                    icon="delete"
                    block
                    onClick={this.props.onDelete}>
              Delete
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default TransitionForm;
