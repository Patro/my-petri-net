import React, { Component } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

class PlaceForm extends Component {
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
        <h2>Place</h2>
        <Form layout="vertical">
          <Form.Item label="Label">
            <Input id="label"
                   value={this.props.label}
                   onChange={this.handleLabelChange} />
          </Form.Item>
          <Form.Item label="Capacity" extra="Leave empty for unlimited capacity.">
            <InputNumber id="capacityLimit"
                         min={0}
                         value={this.props.capacityLimit}
                         onChange={this.props.onCapacityLimitChange} />
          </Form.Item>
          <Form.Item label="Initial number of tokens">
            <InputNumber id="numberOfTokens"
                         min={0}
                         value={this.props.numberOfTokens}
                         onChange={this.props.onNumberOfTokensChange} />
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

export default PlaceForm;
