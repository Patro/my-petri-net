import cytoscape from 'cytoscape';
import * as nodeType from '../constants/nodeTypes';
import LinerarTokenFlowAnimation from './LinearTokenFlowAnimation';
import TransitionAnimation from './TransitionAnimation';

jest.mock('./LinearTokenFlowAnimation');

const setupCytoscape = () => (
  cytoscape({
    elements: [
      {
        group: 'nodes',
        data: {
          id: 'upstream-place',
          type: nodeType.PLACE,
          numberOfTokens: 3,
        },
        position: { x: 1, y: 1 },
      },
      {
        group: 'nodes',
        data: {
          id: 'transition',
          type: nodeType.TRANSITION,
        },
        position: { x: 2, y: 2 },
      },
      {
        group: 'nodes',
        data: {
          id: 'downstream-place',
          type: nodeType.PLACE,
          numberOfTokens: 0,
        },
        position: { x: 3, y: 3 },
      },
      {
        group: 'edges',
        data: {
          id: 'upstream-place_transition',
          source: 'upstream-place',
          target: 'transition',
          weight: 2,
        },
      },
      {
        group: 'edges',
        data: {
          id: 'transition_downstream-place',
          source: 'transition',
          target: 'downstream-place',
          weight: 3,
        },
      },
    ],
  })
);

describe('TransitionAnimation', () => {
  describe('active', () => {
    it('should animate token flow of incoming edge', async () => {
      const cy = setupCytoscape();
      const transition = cy.elements('#transition').first();
      const animation = new TransitionAnimation(transition);

      await animation.play();

      const incomingEdge = cy.elements('#upstream-place_transition').first();
      expect(LinerarTokenFlowAnimation).toBeCalledWith(incomingEdge);
    });

    it('should reduce number of tokens of upstream place', async () => {
      const cy = setupCytoscape();
      const transition = cy.elements('#transition').first();
      const animation = new TransitionAnimation(transition);

      await animation.play();

      const upstreamPlace = cy.elements('#upstream-place').first();
      expect(upstreamPlace.data().numberOfTokens).toBe(1);
    });

    it('should animate token flow of outgoing edge', async () => {
      const cy = setupCytoscape();
      const transition = cy.elements('#transition').first();
      const animation = new TransitionAnimation(transition);

      await animation.play();

      const outgoingEdge = cy.elements('#transition_downstream-place').first();
      expect(LinerarTokenFlowAnimation).toBeCalledWith(outgoingEdge);
    });

    it('should increase number of tokens of downstream place', async () => {
      const cy = setupCytoscape();
      const transition = cy.elements('#transition').first();
      const animation = new TransitionAnimation(transition);

      await animation.play();

      const downstreamPlace = cy.elements('#downstream-place').first();
      expect(downstreamPlace.data().numberOfTokens).toBe(3);
    });
  });

  describe('canceled', () => {
    it('should not animate token flow of incoming edge', async () => {
      const cy = setupCytoscape();
      const transition = cy.elements('#transition').first();
      const animation = new TransitionAnimation(transition);

      animation.cancel();
      await animation.play();

      const incomingEdge = cy.elements('#upstream-place_transition').first();
      expect(LinerarTokenFlowAnimation).not.toBeCalledWith(incomingEdge);
    });

    it('should not reduce number of tokens of upstream place', async () => {
      const cy = setupCytoscape();
      const transition = cy.elements('#transition').first();
      const animation = new TransitionAnimation(transition);

      animation.cancel();
      await animation.play();

      const upstreamPlace = cy.elements('#upstream-place').first();
      expect(upstreamPlace.data().numberOfTokens).toBe(3);
    });

    it('should not animate token flow of outgoing edge', async () => {
      const cy = setupCytoscape();
      const transition = cy.elements('#transition').first();
      const animation = new TransitionAnimation(transition);

      animation.cancel();
      await animation.play();

      const outgoingEdge = cy.elements('#transition_downstream-place').first();
      expect(LinerarTokenFlowAnimation).not.toBeCalledWith(outgoingEdge);
    });

    it('should not increase number of tokens of downstream place', async () => {
      const cy = setupCytoscape();
      const transition = cy.elements('#transition').first();
      const animation = new TransitionAnimation(transition);

      animation.cancel();
      await animation.play();

      const downstreamPlace = cy.elements('#downstream-place').first();
      expect(downstreamPlace.data().numberOfTokens).toBe(0);
    });
  });
});
