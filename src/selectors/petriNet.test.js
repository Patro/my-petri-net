import {
  getIncomingEdges, getOutgoingEdges,
  getNumberOfTokens, getActiveTransitions,
} from './petriNet';
import * as nodeTypes from '../constants/nodeTypes';

describe('get incoming edges', () => {
  it('with no edges', () => {
    const state = {
      id: 0,
      edgesById: {},
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.PLACE,
        },
        1: {
          id: 1,
          type: nodeTypes.TRANSITION,
        },
      },
    };

    expect(getIncomingEdges(state, 1)).toEqual([]);
  });

  it('with one edges', () => {
    const state = {
      id: 0,
      edgesById: {
        '0-1': {
          id: '0-1',
          from: '0',
          to: '1',
        },
        '1-0': {
          id: '1-0',
          from: '1',
          to: '0',
        },
      },
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.PLACE,
        },
        1: {
          id: 1,
          type: nodeTypes.TRANSITION,
        },
      },
    };
    const edges = [state.edgesById['0-1']];

    expect(getIncomingEdges(state, 1)).toEqual(edges);
  });

  it('with two edges', () => {
    const state = {
      id: 0,
      edgesById: {
        '0-1': {
          id: '0-1',
          from: '0',
          to: '1',
        },
        '1-0': {
          id: '1-0',
          from: '1',
          to: '0',
        },
        '2-1': {
          id: '2-1',
          from: '2',
          to: '1',
        },
        '1-2': {
          id: '1-2',
          from: '1',
          to: '2',
        },
      },
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.PLACE,
        },
        1: {
          id: 1,
          type: nodeTypes.TRANSITION,
        },
        2: {
          id: 2,
          type: nodeTypes.PLACE,
        },
      },
    };
    const edges = [state.edgesById['0-1'], state.edgesById['2-1']];

    expect(getIncomingEdges(state, 1)).toEqual(edges);
  });
});

describe('get outgoing edges', () => {
  it('with no edges', () => {
    const state = {
      id: 0,
      edgesById: {},
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.PLACE,
        },
        1: {
          id: 1,
          type: nodeTypes.TRANSITION,
        },
      },
    };

    expect(getOutgoingEdges(state, 1)).toEqual([]);
  });

  it('with one edges', () => {
    const state = {
      id: 0,
      edgesById: {
        '0-1': {
          id: '0-1',
          from: '0',
          to: '1',
        },
        '1-0': {
          id: '1-0',
          from: '1',
          to: '0',
        },
      },
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.PLACE,
        },
        1: {
          id: 1,
          type: nodeTypes.TRANSITION,
        },
      },
    };
    const edges = [state.edgesById['1-0']];

    expect(getOutgoingEdges(state, 1)).toEqual(edges);
  });

  it('with two edges', () => {
    const state = {
      id: 0,
      edgesById: {
        '0-1': {
          id: '0-1',
          from: '0',
          to: '1',
        },
        '1-0': {
          id: '1-0',
          from: '1',
          to: '0',
        },
        '2-1': {
          id: '2-1',
          from: '2',
          to: '1',
        },
        '1-2': {
          id: '1-2',
          from: '1',
          to: '2',
        },
      },
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.PLACE,
        },
        1: {
          id: 1,
          type: nodeTypes.TRANSITION,
        },
        2: {
          id: 2,
          type: nodeTypes.PLACE,
        },
      },
    };
    const edges = [state.edgesById['1-0'], state.edgesById['1-2']];

    expect(getOutgoingEdges(state, 1)).toEqual(edges);
  });
});

describe('get number of tokens', () => {
  it('with one marking', () => {
    const state = {
      id: 0,
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.PLACE,
        },
        1: {
          id: 1,
          type: nodeTypes.PLACE,
        },
      },
      markings: [
        {
          0: 1,
          1: 3,
        }
      ],
    };

    expect(getNumberOfTokens(state, 0)).toEqual(1);
  });

  it('with two marking', () => {
    const state = {
      id: 0,
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.PLACE,
        },
        1: {
          id: 1,
          type: nodeTypes.PLACE,
        },
      },
      markings: [
        {
          0: 1,
          1: 3,
        },
        {
          0: 4,
          1: 5,
        },
      ],
    };

    expect(getNumberOfTokens(state, 0)).toEqual(4);
  });
});

describe('get active transitions', () => {
  it ('with no edges', () => {
    const state = {
      id: 0,
      edgesById: {},
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.TRANSITION,
        },
      },
      markings: [{}],
    };
    const activeTransitions = [state.nodesById[0]];

    expect(getActiveTransitions(state)).toEqual(activeTransitions);
  });

  describe('with incoming edge', () => {
    it('number of tokens matches weight', () => {
      const state = {
        id: 0,
        edgesById: {
          '0-1': {
            id: '0-1',
            from: '0',
            to: '1',
            weight: 1,
          },
        },
        nodesById: {
          0: {
            id: 0,
            type: nodeTypes.PLACE,
          },
          1: {
            id: 1,
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            0: 1,
          },
        ],
      };
      const activeTransitions = [state.nodesById[1]];

      expect(getActiveTransitions(state)).toEqual(activeTransitions);
    });

    it('weight exceeds number of tokens', () => {
      const state = {
        id: 0,
        edgesById: {
          '0-1': {
            id: '0-1',
            from: '0',
            to: '1',
            weight: 2,
          },
        },
        nodesById: {
          0: {
            id: 0,
            type: nodeTypes.PLACE,
          },
          1: {
            id: 1,
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            0: 1,
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
        id: 0,
        edgesById: {
          '1-0': {
            id: '1-0',
            from: '1',
            to: '0',
            weight: 1,
          },
        },
        nodesById: {
          0: {
            id: 0,
            type: nodeTypes.PLACE,
          },
          1: {
            id: 1,
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            0: 0,
          },
        ],
      };
      const activeTransitions = [state.nodesById[1]];

      expect(getActiveTransitions(state)).toEqual(activeTransitions);
    });

    it('with sufficient capacity', () => {
      const state = {
        id: 0,
        edgesById: {
          '1-0': {
            id: '1-0',
            from: '1',
            to: '0',
            weight: 2,
          },
        },
        nodesById: {
          0: {
            id: 0,
            type: nodeTypes.PLACE,
            capacityLimit: 4,
          },
          1: {
            id: 1,
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            0: 2,
          },
        ],
      };
      const activeTransitions = [state.nodesById[1]];

      expect(getActiveTransitions(state)).toEqual(activeTransitions);
    });

    it('with unavailable capacity', () => {
      const state = {
        id: 0,
        edgesById: {
          '1-0': {
            id: '1-0',
            from: '1',
            to: '0',
            weight: 2,
          },
        },
        nodesById: {
          0: {
            id: 0,
            type: nodeTypes.PLACE,
            capacityLimit: 3,
          },
          1: {
            id: 1,
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            0: 2,
          },
        ],
      };
      const activeTransitions = [];

      expect(getActiveTransitions(state)).toEqual(activeTransitions);
    });
  });

  it('with incoming and outgoing edges', () => {
    const state = {
      id: 0,
      edgesById: {
        '0-1': {
          id: '0-1',
          from: '0',
          to: '1',
          weight: 1,
        },
        '1-2': {
          id: '1-2',
          from: '1',
          to: '2',
          weight: 1,
        },
      },
      nodesById: {
        0: {
          id: 0,
          type: nodeTypes.PLACE,
        },
        1: {
          id: 1,
          type: nodeTypes.TRANSITION,
        },
        2: {
          id: 2,
          type: nodeTypes.PLACE,
        },
      },
      markings: [
        {
          0: 1,
          2: 0,
        },
      ],
    };
    const activeTransitions = [state.nodesById[1]];

    expect(getActiveTransitions(state)).toEqual(activeTransitions);
  });
});
