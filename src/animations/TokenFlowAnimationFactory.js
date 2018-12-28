import BezierCurveTokenFlowAnimation from './BezierCurveTokenFlowAnimation';
import LinearTokenFlowAnimation from './LinearTokenFlowAnimation';

const isBezierCurve = (edgeElement) => (
  edgeElement.controlPoints() !== undefined
)

const animationFor = (edgeElement) => {
  if (isBezierCurve(edgeElement)) {
    return new BezierCurveTokenFlowAnimation(edgeElement);
  }
  return new LinearTokenFlowAnimation(edgeElement);
}

export default { animationFor }
