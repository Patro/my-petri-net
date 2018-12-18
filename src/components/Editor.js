import React, { Component } from 'react';
import { Layout } from 'antd';
import * as nodeType from '../constants/nodeTypes';
import EditorToolbar from './EditorToolbar'
import GraphArea from './GraphArea';
import PetriNetGraph from './PetriNetGraph';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNodeType: nodeType.TRANSITION,
      selected: {},
    };
    this.handleClickOnBackground = this.handleClickOnBackground.bind(this);
    this.handleNodeTypeChange = this.handleNodeTypeChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);
  }

  handleClickOnBackground(position) {
    this.props.onAddNode(this.state.activeNodeType, position);
  }

  handleSelect(type, id) {
    this.setState({ selected: { type, id } });
  }

  handleUnselect(id) {
    if (id !== this.state.selected.id) {
      return;
    }
    this.setState({ selected: {} });
  }

  handleNodeTypeChange(nodeType) {
    this.setState({ activeNodeType: nodeType });
  }

  render() {
    return (
      <>
        <EditorToolbar activeNodeType={this.state.activeNodeType} onNodeTypeChange={this.handleNodeTypeChange} />
        <Layout>
          <GraphArea>
            <PetriNetGraph
              petriNet={this.props.petriNet}
              selectedId={this.state.selected.id}
              onAddEdge={this.props.onAddEdge}
              onClickOnBackground={this.handleClickOnBackground}
              onMove={this.props.onMove}
              onSelect={this.handleSelect}
              onUnselect={this.handleUnselect} />
          </GraphArea>
        </Layout>
      </>
    );
  }
}

export default Editor;
