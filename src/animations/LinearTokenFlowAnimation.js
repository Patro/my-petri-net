import TokenFlowAnimation from './TokenFlowAnimation';

class LinearTokenFlowAnimation extends TokenFlowAnimation {
  animateToken(token) {
    var animation = token.animation({
      position: this.edgeElement.targetEndpoint(),
      duration: 500,
      queue: true,
    });
    return animation.play().promise();
  }
}

export default LinearTokenFlowAnimation;
