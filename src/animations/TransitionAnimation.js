import TokenFlowAnimationFactory from './TokenFlowAnimationFactory';

class TransitionAnimation {
  constructor(transitionElement) {
    this.canceled = false;
    this.cytoscape = transitionElement.cy();
    this.transitionElement = transitionElement;
  }

  async animateIncomingEdge(edgeElement) {
    const source = edgeElement.source();
    const numberOfTokens = source.data('numberOfTokens') - edgeElement.data('weight');
    source.data('numberOfTokens', numberOfTokens);

    await this.animateTokenFlowOfEdge(edgeElement);
  }

  animateIncomingEdges() {
    if (this.canceled === true) {
      return Promise.resolve();
    }

    const incomingEdges = this.transitionElement.incomers('edge');
    const promises = incomingEdges.map(
      this.animateIncomingEdge.bind(this)
    );
    return Promise.all(promises);
  }

  async animateOutgoingEdge(edgeElement) {
    await this.animateTokenFlowOfEdge(edgeElement);

    if (this.canceled === true) {
      return Promise.resolve();
    }

    const target = edgeElement.target();
    const numberOfTokens = target.data('numberOfTokens') + edgeElement.data('weight');
    target.data('numberOfTokens', numberOfTokens);
  }

  animateOutgoingEdges() {
    if (this.canceled === true) {
      return Promise.resolve();
    }

    const outgoingEdges = this.transitionElement.outgoers('edge');
    const promises = outgoingEdges.map(
      this.animateOutgoingEdge.bind(this)
    );
    return Promise.all(promises);
  }

  animateTokenFlowOfEdge(edgeElement) {
    return TokenFlowAnimationFactory.animationFor(edgeElement).play();
  }

  cancel() {
    this.canceled = true;
  }

  async play() {
    await this.animateIncomingEdges();
    await this.animateOutgoingEdges();
  }
}

export default TransitionAnimation;
