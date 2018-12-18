import React, { Component } from 'react';
import { Button, Form, InputNumber } from 'antd';

class EdgeForm extends Component {
  render() {
    return (
      <>
        <h2>Edge</h2>
        <Form layout="vertical">
          <Form.Item label="Weight">
            <InputNumber id="weight"
                         min={1}
                         value={this.props.weight}
                         onChange={this.props.onWeightChange} />
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

export default EdgeForm;
