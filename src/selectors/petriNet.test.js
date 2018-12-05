import {
  getIncomingEdges, getOutgoingEdges,
  getNumberOfTokens, getActiveTransitions,
} from './petriNet';
import * as nodeTypes from '../constants/nodeTypes';

describe('get incoming edges', () => {
  it('with no edges', () => {
    const state = {
      id: 'petri-net-uuid',
      edgesById: {},
      nodesById: {
        'place-uuid': {
          id: 'place-uuid',
          type: nodeTypes.PLACE,
        },
        'transition-uuid': {
          id: 'transition-uuid',
          type: nodeTypes.TRANSITION,
        },
      },
    };

    expect(getIncomingEdges(state, 'transition-uuid')).toEqual([]);
  });

  it('with one edges', () => {
    const state = {
      id: 'petri-net-uuid',
      edgesById: {
        'place-uuid-transition-uuid': {
          id: 'place-uuid-transition-uuid',
          from: 'place-uuid',
          to: 'transition-uuid',
        },
        'transition-uuid-place-uuid': {
          id: 'transition-uuid-place-uuid',
          from: 'transition-uuid',
          to: 'place-uuid',
        },
      },
      nodesById: {
        'place-uuid': {
          id: 'place-uuid',
          type: nodeTypes.PLACE,
        },
        'transition-uuid': {
          id: 'transition-uuid',
          type: nodeTypes.TRANSITION,
        },
      },
    };
    const edges = [state.edgesById['place-uuid-transition-uuid']];

    expect(getIncomingEdges(state, 'transition-uuid')).toEqual(edges);
  });

  it('with two edges', () => {
    const state = {
      id: 'petri-net-uuid',
      edgesById: {
        'place-uuid-1-transition-uuid': {
          id: 'place-uuid-1-transition-uuid',
          from: 'place-uuid-1',
          to: 'transition-uuid',
        },
        'transition-uuid-place-uuid-1': {
          id: 'transition-uuid-place-uuid-1',
          from: 'transition-uuid',
          to: 'place-uuid-1',
        },
        'place-uuid-2-transition-uuid': {
          id: 'place-uuid-2-transition-uuid',
          from: 'place-uuid-2',
          to: 'transition-uuid',
        },
        'transition-uuid-place-uuid-2': {
          id: 'transition-uuid-place-uuid-2',
          from: 'transition-uuid',
          to: 'place-uuid-2',
        },
      },
      nodesById: {
        'place-uuid-1': {
          id: 'place-uuid-1',
          type: nodeTypes.PLACE,
        },
        'transition-uuid': {
          id: 'transition-uuid',
          type: nodeTypes.TRANSITION,
        },
        'place-uuid-2': {
          id: 'place-uuid-2',
          type: nodeTypes.PLACE,
        },
      },
    };
    const edges = [state.edgesById['place-uuid-1-transition-uuid'], state.edgesById['place-uuid-2-transition-uuid']];

    expect(getIncomingEdges(state, 'transition-uuid')).toEqual(edges);
  });
});

describe('get outgoing edges', () => {
  it('with no edges', () => {
    const state = {
      id: 'petri-net-uuid',
      edgesById: {},
      nodesById: {
        'place-uuid': {
          id: 'place-uuid',
          type: nodeTypes.PLACE,
        },
        'transition-uuid': {
          id: 'transition-uuid',
          type: nodeTypes.TRANSITION,
        },
      },
    };

    expect(getOutgoingEdges(state, 'transition-uuid')).toEqual([]);
  });

  it('with one edges', () => {
    const state = {
      id: 'petri-net-uuid',
      edgesById: {
        'place-uuid-transition-uuid': {
          id: 'place-uuid-transition-uuid',
          from: 'place-uuid',
          to: 'transition-uuid',
        },
        'transition-uuid-place-uuid': {
          id: 'transition-uuid-place-uuid',
          from: 'transition-uuid',
          to: 'place-uuid',
        },
      },
      nodesById: {
        'place-uuid': {
          id: 'place-uuid',
          type: nodeTypes.PLACE,
        },
        'transition-uuid': {
          id: 'transition-uuid',
          type: nodeTypes.TRANSITION,
        },
      },
    };
    const edges = [state.edgesById['transition-uuid-place-uuid']];

    expect(getOutgoingEdges(state, 'transition-uuid')).toEqual(edges);
  });

  it('with two edges', () => {
    const state = {
      id: 'petri-net-uuid',
      edgesById: {
        'place-uuid-1-transition-uuid': {
          id: 'place-uuid-1-transition-uuid',
          from: 'place-uuid-1',
          to: 'transition-uuid',
        },
        'transition-uuid-place-uuid-1': {
          id: 'transition-uuid-place-uuid-1',
          from: 'transition-uuid',
          to: 'place-uuid-1',
        },
        'place-uuid-2-transition-uuid': {
          id: 'place-uuid-2-transition-uuid',
          from: 'place-uuid-2',
          to: 'transition-uuid',
        },
        'transition-uuid-place-uuid-2': {
          id: 'transition-uuid-place-uuid-2',
          from: 'transition-uuid',
          to: 'place-uuid-2',
        },
      },
      nodesById: {
        'place-uuid-1': {
          id: 'place-uuid-1',
          type: nodeTypes.PLACE,
        },
        'transition-uuid': {
          id: 'transition-uuid',
          type: nodeTypes.TRANSITION,
        },
        'place-uuid-2': {
          id: 'place-uuid-2',
          type: nodeTypes.PLACE,
        },
      },
    };
    const edges = [state.edgesById['transition-uuid-place-uuid-1'], state.edgesById['transition-uuid-place-uuid-2']];

    expect(getOutgoingEdges(state, 'transition-uuid')).toEqual(edges);
  });
});

describe('get number of tokens', () => {
  it('with one marking', () => {
    const state = {
      id: 'petri-net-uuid',
      nodesById: {
        'place-uuid-1': {
          id: 'place-uuid-1',
          type: nodeTypes.PLACE,
        },
        'place-uuid-2': {
          id: 'place-uuid-2',
          type: nodeTypes.PLACE,
        },
      },
      markings: [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 3,
        }
      ],
    };

    expect(getNumberOfTokens(state, 'place-uuid-1')).toEqual(1);
  });

  it('with two marking', () => {
    const state = {
      id: 'petri-net-uuid',
      nodesById: {
        'place-uuid-1': {
          id: 'place-uuid-1',
          type: nodeTypes.PLACE,
        },
        'place-uuid-2': {
          id: 'place-uuid-2',
          type: nodeTypes.PLACE,
        },
      },
      markings: [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 3,
        },
        {
          'place-uuid-1': 4,
          'place-uuid-2': 5,
        },
      ],
    };

    expect(getNumberOfTokens(state, 'place-uuid-1')).toEqual(4);
  });
});

describe('get active transitions', () => {
  it ('with no edges', () => {
    const state = {
      id: 'petri-net-uuid',
      edgesById: {},
      nodesById: {
        'transition-uuid': {
          id: 'transition-uuid',
          type: nodeTypes.TRANSITION,
        },
      },
      markings: [{}],
    };
    const activeTransitions = [state.nodesById['transition-uuid']];

    expect(getActiveTransitions(state)).toEqual(activeTransitions);
  });

  describe('with incoming edge', () => {
    it('number of tokens matches weight', () => {
      const state = {
        id: 'petri-net-uuid',
        edgesById: {
          'place-uuid-transition-uuid': {
            id: 'place-uuid-transition-uuid',
            from: 'place-uuid',
            to: 'transition-uuid',
            weight: 1,
          },
        },
        nodesById: {
          'place-uuid': {
            id: 'place-uuid',
            type: nodeTypes.PLACE,
          },
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            'place-uuid': 1,
          },
        ],
      };
      const activeTransitions = [state.nodesById['transition-uuid']];

      expect(getActiveTransitions(state)).toEqual(activeTransitions);
    });

    it('weight exceeds number of tokens', () => {
      const state = {
        id: 'petri-net-uuid',
        edgesById: {
          'place-uuid-transition-uuid': {
            id: 'place-uuid-transition-uuid',
            from: 'place-uuid',
            to: 'transition-uuid',
            weight: 2,
          },
        },
        nodesById: {
          'place-uuid': {
            id: 'place-uuid',
            type: nodeTypes.PLACE,
          },
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            'place-uuid': 1,
          },
        ],
      };
      const activeTransitions = [];

      expect(getActiveTransitions(state)).toEqual(activeTransitions);
    });
  });

  describe('with outgoing edge', () => {
    it('without capacity limit', () => {
      const state = {
        id: 'petri-net-uuid',
        edgesById: {
          'transition-uuid-place-uuid': {
            id: 'transition-uuid-place-uuid',
            from: 'transition-uuid',
            to: 'place-uuid',
            weight: 2,
          },
        },
        nodesById: {
          'place-uuid': {
            id: 'place-uuid',
            type: nodeTypes.PLACE,
          },
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            'place-uuid': 0,
          },
        ],
      };
      const activeTransitions = [state.nodesById['transition-uuid']];

      expect(getActiveTransitions(state)).toEqual(activeTransitions);
    });

    it('with sufficient capacity', () => {
      const state = {
        id: 'petri-net-uuid',
        edgesById: {
          'transition-uuid-place-uuid': {
            id: 'transition-uuid-place-uuid',
            from: 'transition-uuid',
            to: 'place-uuid',
            weight: 2,
          },
        },
        nodesById: {
          'place-uuid': {
            id: 'place-uuid',
            type: nodeTypes.PLACE,
            capacityLimit: 4,
          },
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            'place-uuid': 2,
          },
        ],
      };
      const activeTransitions = [state.nodesById['transition-uuid']];

      expect(getActiveTransitions(state)).toEqual(activeTransitions);
    });

    it('with unavailable capacity', () => {
      const state = {
        id: 'petri-net-uuid',
        edgesById: {
          'transition-uuid-place-uuid': {
            id: 'transition-uuid-place-uuid',
            from: 'transition-uuid',
            to: 'place-uuid',
            weight: 2,
          },
        },
        nodesById: {
          'place-uuid': {
            id: 'place-uuid',
            type: nodeTypes.PLACE,
            capacityLimit: 3,
          },
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            'place-uuid': 2,
          },
        ],
      };
      const activeTransitions = [];

      expect(getActiveTransitions(state)).toEqual(activeTransitions);
    });
  });

  it('with incoming and outgoing edges', () => {
    const state = {
      id: 'petri-net-uuid',
      edgesById: {
        'place-uuid-1-transition-uuid': {
          id: 'place-uuid-1-transition-uuid',
          from: 'place-uuid-1',
          to: 'transition-uuid',
          weight: 1,
        },
        'transition-uuid-place-uuid-2': {
          id: 'transition-uuid-place-uuid-2',
          from: 'transition-uuid',
          to: 'place-uuid-2',
          weight: 1,
        },
      },
      nodesById: {
        'place-uuid-1': {
          id: 'place-uuid-1',
          type: nodeTypes.PLACE,
        },
        'transition-uuid': {
          id: 'transition-uuid',
          type: nodeTypes.TRANSITION,
        },
        'place-uuid-2': {
          id: 'place-uuid-2',
          type: nodeTypes.PLACE,
        },
      },
      markings: [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 0,
        },
      ],
    };
    const activeTransitions = [state.nodesById['transition-uuid']];

    expect(getActiveTransitions(state)).toEqual(activeTransitions);
  });
});
