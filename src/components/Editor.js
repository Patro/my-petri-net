import React, { Component } from 'react';
import { Layout } from 'antd';
import * as nodeType from '../constants/nodeTypes';
import EditorToolbar from './EditorToolbar'
import PetriNetGraph from './PetriNetGraph';

const { Content } = Layout;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNodeType: nodeType.TRANSITION,
    };
    this.handleClickOnBackground = this.handleClickOnBackground.bind(this);
    this.handleNodeTypeChange = this.handleNodeTypeChange.bind(this);
  }

  handleClickOnBackground(position) {
    this.props.onAddNode(this.state.activeNodeType, position);
  }

  handleNodeTypeChange(nodeType) {
    this.setState({ activeNodeType: nodeType });
  }

  render() {
    return (
      <>
        <EditorToolbar activeNodeType={this.state.activeNodeType} onNodeTypeChange={this.handleNodeTypeChange} />
        <Layout>
          <Content className="content">
            <PetriNetGraph
              petriNet={this.props.petriNet}
              onAddEdge={this.props.onAddEdge}
              onClickOnBackground={this.handleClickOnBackground}
              onMove={this.props.onMove} />
          </Content>
        </Layout>
      </>
    );
  }
}

export default Editor;
