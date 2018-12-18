import React, { Component } from 'react';
import { getActiveTransitions } from '../selectors/petriNet';
import GraphArea from './GraphArea';
import PetriNetGraph from './PetriNetGraph';
import SimulatorToolbar from './SimulatorToolbar'

class Simulator extends Component {
  constructor(props) {
    super(props);

    this.handleClickOnElement = this.handleClickOnElement.bind(this);
  }

  activeTransitionIds() {
    if (this.props.petriNet === undefined) {
      return [];
    }

    return getActiveTransitions(this.props.petriNet).map(transition => transition.id);
  }

  handleClickOnElement(type, id) {
    if (!this.isTransitionActive(id)) {
      return;
    }
    this.props.onFireTransition(id);
  }

  highlightedIds() {
    return this.activeTransitionIds();
  }

  isTransitionActive(id) {
    return this.activeTransitionIds().indexOf(id) !== -1;
  }

  render() {
    return (
      <>
        <SimulatorToolbar onReset={this.props.onReset} />
        <GraphArea>
          <PetriNetGraph petriNet={this.props.petriNet}
                         locked={true}
                         maxZoom={1}
                         highlightedIds={this.highlightedIds()}
                         onClickOnElement={this.handleClickOnElement} />
        </GraphArea>
      </>
    );
  }
}

export default Simulator;
