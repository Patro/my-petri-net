import { getIncomingEdges, getOutgoingEdges } from './petriNet';
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
