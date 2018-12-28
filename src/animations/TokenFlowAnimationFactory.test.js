import BezierCurveTokenFlowAnimation from './BezierCurveTokenFlowAnimation';
import LinearTokenFlowAnimation from './LinearTokenFlowAnimation';
import TokenFlowAnimationFactory from './TokenFlowAnimationFactory';
import { getEdge, setupCytoscape } from './TokenFlowAnimation.test';

describe('TokenFlowAnimationFactory', () => {
  it('should create bezier curve animation with bezier curve edge', async () => {
    const cy = setupCytoscape();
    const edge = getEdge(cy);
    edge.controlPoints = jest.fn(() => ({ x: 100, y: 100 }));

    const animation = TokenFlowAnimationFactory.animationFor(edge);

    expect(animation).toBeInstanceOf(BezierCurveTokenFlowAnimation);
  });

  it('should create linear animation with linear edge', async () => {
    const cy = setupCytoscape();
    const edge = getEdge(cy);

    const animation = TokenFlowAnimationFactory.animationFor(edge);

    expect(animation).toBeInstanceOf(LinearTokenFlowAnimation);
  });
});
