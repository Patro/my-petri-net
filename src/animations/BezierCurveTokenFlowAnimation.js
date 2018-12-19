import TokenFlowAnimation from './TokenFlowAnimation';
import bezierCurve from './../utils/bezierCurve';

class BezierCurveTokenFlowAnimation extends TokenFlowAnimation {
  pointOnBezierCurve(t) {
    return bezierCurve.pointAt(
      this.edgeElement.sourceEndpoint(),
      this.edgeElement.controlPoints()[0],
      this.edgeElement.targetEndpoint(),
      t
    );
  }

  animateToken(token) {
    let numberOfSteps = 30;
    let durationOfStep = 500 / numberOfSteps;
    let delta = 1.0 / numberOfSteps;
    for(var i = 0; i < (numberOfSteps - 1); i++) {
      let t = delta * (i + 1);
      token.animate({
        position: this.pointOnBezierCurve(t),
        duration: durationOfStep,
      });
    }

    var animation = token.animation({
      position: this.edgeElement.targetEndpoint(),
      duration: durationOfStep,
      queue: true,
    });
    return animation.play().promise();
  }
}

export default BezierCurveTokenFlowAnimation;
