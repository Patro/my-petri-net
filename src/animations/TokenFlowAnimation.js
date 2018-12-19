class TokenFlowAnimation {
  constructor(edgeElement) {
    this.cytoscape = edgeElement.cy();
    this.edgeElement = edgeElement;
  }

  async play() {
    const token = this.addToken();
    await this.animateToken(token)
    this.removeToken(token);
  }

  addToken() {
    return this.cytoscape.add({
      group: "nodes",
      classes: "token",
      position: this.edgeElement.sourceEndpoint(),
    });
  }

  animateToken(token) {
    throw new Error('Not implemented');
  }

  removeToken(token) {
    token.remove();
  }
}

export default TokenFlowAnimation;
