import React, { Component } from 'react';
import TransitionAnimation from '../animations/TransitionAnimation';
import { getActiveTransitions } from '../selectors/petriNet';
import GraphArea from './GraphArea';
import GraphAnimation from './GraphAnimation';
import PetriNetGraph from './PetriNetGraph';
import SimulatorToolbar from './SimulatorToolbar'

class Simulator extends Component {
  constructor(props) {
    super(props);

    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleClickOnElement = this.handleClickOnElement.bind(this);
    this.state = {};
  }

  activeTransitionIds() {
    if (this.props.petriNet === undefined) {
      return [];
    }

    return getActiveTransitions(this.props.petriNet).map(transition => transition.id);
  }

  componentWillUnmount() {
    this.props.onReset();
  }

  handleAnimationEnd() {
    this.props.onFireTransition(this.state.selected);
    this.setState({ selected: undefined });
  }

  handleClickOnElement(type, id) {
    if (!this.isTransitionActive(id) || this.state.selected !== undefined) {
      return;
    }
    this.setState({ selected: id });
  }

  highlightedIds() {
    return this.state.selected ? [] : this.activeTransitionIds();
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
                         onClickOnElement={this.handleClickOnElement}>
            {this.renderAnimation()}
          </PetriNetGraph>
        </GraphArea>
      </>
    );
  }

  renderAnimation() {
    if (this.state.selected === undefined) {
      return null;
    }

    return <GraphAnimation elementId={this.state.selected}
                           animation={TransitionAnimation}
                           onEnd={this.handleAnimationEnd} />
  }
}

export default Simulator;
