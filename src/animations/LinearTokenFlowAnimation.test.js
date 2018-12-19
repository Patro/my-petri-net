import LinearTokenFlowAnimation from './LinearTokenFlowAnimation';
import { getCreatedToken, getEdge, setupCytoscape } from './TokenFlowAnimation.test';

describe('LinearTokenFlowAnimation', () => {
  it('should create animation', async () => {
    const cy = setupCytoscape();
    const edge = getEdge(cy);
    const animation = new LinearTokenFlowAnimation(edge);

    await animation.play();

    const token = getCreatedToken(cy);
    expect(token.animation).toBeCalled();
  });
});
