import BezierCurveTokenFlowAnimation from './BezierCurveTokenFlowAnimation';
import { getCreatedToken, getEdge, setupCytoscape } from './TokenFlowAnimation.test';

describe('BezierCurveTokenFlowAnimation', () => {
  it('should create animation', async () => {
    const cy = setupCytoscape();
    const edge = getEdge(cy);
    edge.controlPoints = jest.fn(() => [{ x: 100, y: 100 }]);
    const animation = new BezierCurveTokenFlowAnimation(edge);

    await animation.play();

    const token = getCreatedToken(cy);
    expect(token.animation).toBeCalled();
  });
});
