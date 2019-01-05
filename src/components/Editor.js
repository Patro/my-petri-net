import React, { Component } from 'react';
import { Layout } from 'antd';
import uuidv4 from 'uuid/v4';
import * as elementType from '../constants/elementTypes';
import * as nodeType from '../constants/nodeTypes';
import EditorToolbar from './EditorToolbar';
import ElementForm from './ElementForm';
import GraphArea from './GraphArea';
import PetriNetGraph from './PetriNetGraph';
import './Editor.css';

const { Sider } = Layout;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNodeType: nodeType.TRANSITION,
      selected: {},
    };
    this.handleAddEdge = this.handleAddEdge.bind(this);
    this.handleClickOnBackground = this.handleClickOnBackground.bind(this);
    this.handleNodeTypeChange = this.handleNodeTypeChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);
  }

  getSelectedElement() {
    const id = this.state.selected.id;
    switch (this.state.selected.type) {
      case elementType.EDGE:
        return this.props.petriNet.edgesById[id];
      case elementType.NODE:
        return this.props.petriNet.nodesById[id];
      default:
        return;
    }
  }

  handleAddEdge(from, to) {
    this.props.onAddEdge(from, to);
    this.setState({ selected: { type: elementType.EDGE, id: `${from}_${to}` } });
  }

  handleClickOnBackground(position) {
    const nodeId = uuidv4();
    this.props.onAddNode(nodeId, this.state.activeNodeType, position);
    this.setState({ selected: { type: elementType.NODE, id: nodeId } });
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
              maxZoom={1}
              onAddEdge={this.handleAddEdge}
              onClickOnBackground={this.handleClickOnBackground}
              onMove={this.props.onMove}
              onSelect={this.handleSelect}
              onUnselect={this.handleUnselect} />
          </GraphArea>
          { this.renderSidebar() }
        </Layout>
      </>
    );
  }

  renderSidebar() {
    const element = this.getSelectedElement();
    if (element === undefined) {
      return;
    }

    return <Sider className="editor__sidebar" width={260}>
             <ElementForm element={element} elementType={this.state.selected.type} />
           </Sider>
  }
}

export default Editor;
