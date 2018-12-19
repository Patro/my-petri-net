import cytoscape from 'cytoscape';
import TokenFlowAnimation from './TokenFlowAnimation';

export const getCreatedToken = (cy) => cy.add.mock.results[0].value;
export const getEdge = (cy) => cy.elements('#node-a_node-b').first();
export const setupCytoscape = () => (
  cytoscape({
    elements: [
      {
        group: 'nodes',
        data: {
          id: 'node-a',
        },
        position: { x: 1, y: 1 },
      },
      {
        group: 'nodes',
        data: {
          id: 'node-b',
        },
        position: { x: 2, y: 2 },
      },
      {
        group: 'edges',
        data: {
          id: 'node-a_node-b',
          source: 'node-a',
          target: 'node-b',
        },
      },
    ],
  })
);

describe('TokenFlowAnimation', () => {
  it('should throw exception', async () => {
    const cy = setupCytoscape();
    const edge = getEdge(cy);
    const animation = new TokenFlowAnimation(edge);

    try {
      await animation.play();
    }
    catch (e) {
      expect(e).toEqual(new Error('Not implemented'));
    }
  });

  it('should create node with class token', async () => {
    const cy = setupCytoscape();
    const edge = getEdge(cy);
    const animation = new TokenFlowAnimation(edge);
    animation.animateToken = () => {};

    await animation.play();

    expect(cy.add.mock.calls[0][0].classes).toEqual('token');
  });

  it('should pass token element to template method', async () => {
    const cy = setupCytoscape();
    const edge = getEdge(cy);
    const animation = new TokenFlowAnimation(edge);
    animation.animateToken = jest.fn( (token) => Promise.resolve() );

    await animation.play();

    const token = getCreatedToken(cy);
    expect(animation.animateToken).toBeCalledWith(token);
  });

  it('should remove token element', async () => {
    const cy = setupCytoscape();
    const edge = getEdge(cy);
    const animation = new TokenFlowAnimation(edge);
    animation.animateToken = () => {};

    await animation.play();

    const token = getCreatedToken(cy);
    expect(token.remove).toBeCalled();
  });
});
