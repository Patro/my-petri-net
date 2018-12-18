import React, { Component } from 'react';
import * as elementType from '../constants/elementTypes';
import * as nodeType from '../constants/nodeTypes';
import EdgeFormContainer from '../containers/EdgeFormContainer';
import PlaceFormContainer from '../containers/PlaceFormContainer';
import TransitionFormContainer from '../containers/TransitionFormContainer';

class EditorSidebar extends Component {
  render() {
    switch (this.props.elementType) {
      case elementType.EDGE:
        return this.renderEdgeForm();
      case elementType.NODE:
        return this.renderNodeForm();
      default:
        return null;
    }
  }

  renderEdgeForm() {
    return <EdgeFormContainer edgeId={this.props.element.id} />
  }

  renderNodeForm() {
    switch (this.props.element.type) {
      case nodeType.PLACE:
        return this.renderPlaceForm();
      case nodeType.TRANSITION:
        return this.renderTransitionForm();
      default:
        return null;
    }
  }

  renderPlaceForm() {
    return <PlaceFormContainer placeId={this.props.element.id} />
  }

  renderTransitionForm() {
    return <TransitionFormContainer transitionId={this.props.element.id} />
  }
}

export default EditorSidebar;
