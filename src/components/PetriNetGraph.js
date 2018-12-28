import React, { PureComponent } from 'react';
import { getIncomingEdges } from '../selectors/petriNet';
import ElementCfgFactory from '../utils/ElementCfgFactory';
import PetriNetToElementCfgsMapper from '../utils/PetriNetToElementCfgsMapper';
import EdgeHandles from './EdgeHandles';
import Graph from './Graph';
import petriNetGraphStyle from './PetriNetGraphStyle';

class PetriNetGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.elementCfgFactory = new ElementCfgFactory();
    this.edgeParams = this.edgeParams.bind(this);
    this.shouldAddEdge = this.shouldAddEdge.bind(this);
    this.state = {
      layout: {
        name: 'preset',
      },
    };
  }

  edgeParams(from, to) {
    return this.elementCfgFactory.edgeCfg({
      id: `${from}_${to}`,
      source: from,
      target: to,
    });
  }

  elementsById() {
    const elementsById = new PetriNetToElementCfgsMapper(
      this.props.petriNet,
      this.elementCfgFactory,
      {
        selectedId: this.props.selectedId,
        highlightedIds: this.props.highlightedIds,
        locked: this.props.locked,
      }
    ).map();
    return elementsById;
  }

  shouldAddEdge(from, to) {
    if (from === to) {
      return false;
    }

    const petriNet= this.props.petriNet;
    const fromNode = petriNet.nodesById[from];
    const toNode = petriNet.nodesById[to];
    if (fromNode === undefined || toNode === undefined || fromNode.type === toNode.type) {
      return false;
    }

    const incomingNodeIds = getIncomingEdges(petriNet, toNode.id).map(edge => edge.from);
    if (incomingNodeIds.indexOf(fromNode.id) !== -1) {
      return false;
    }

    return true;
  }

  render = () => {
    return (
      <Graph style={petriNetGraphStyle}
             layout={this.state.layout}
             elementsById={this.elementsById()}
             {...this.props} >
        {this.renderEdgeHandles()}
        {this.props.children}
      </Graph>
    );
  }

  renderEdgeHandles() {
    if (this.props.locked === true) {
      return;
    }

    return <EdgeHandles onAddEdge={this.props.onAddEdge}
                        shouldAddEdge={this.shouldAddEdge}
                        snap={true}
                        edgeParams={this.edgeParams} />
  }
}

export default PetriNetGraph;
