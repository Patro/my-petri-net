import edgesById from './edgesById';
import { addEdge, setWeight, removeEdge } from '../actions';

describe('edges by id reducer', () => {
  it('should handle ADD_EDGE', () => {
    const stateBefore = {
      'node-uuid-1-node-uuid-2': {
        id: 'node-uuid-1-node-uuid-2',
      },
    };
    const action = addEdge('petri-net-uuid', 'node-uuid-3', 'node-uuid-4');
    const stateAfter = {
      'node-uuid-1-node-uuid-2': {
        id: 'node-uuid-1-node-uuid-2',
      },
      'node-uuid-3-node-uuid-4': {
        id: 'node-uuid-3-node-uuid-4',
        from: 'node-uuid-3',
        to: 'node-uuid-4',
        weight: 1,
      },
    };

    expect(edgesById(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SET_WEIGHT', () => {
    const stateBefore = {
      'node-uuid-1-node-uuid-2': {
        id: 'node-uuid-1-node-uuid-2',
      },
      'node-uuid-3-node-uuid-4': {
        id: 'node-uuid-3-node-uuid-4',
        weight: 1,
      },
    };
    const action = setWeight('petri-net-uuid', 'node-uuid-3-node-uuid-4', 2);
    const stateAfter = {
      'node-uuid-1-node-uuid-2': {
        id: 'node-uuid-1-node-uuid-2',
      },
      'node-uuid-3-node-uuid-4': {
        id: 'node-uuid-3-node-uuid-4',
        weight: 2,
      },
    };

    expect(edgesById(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle REMOVE_EDGE', () => {
    const stateBefore = {
      'node-uuid-1-node-uuid-2': {
        id: 'node-uuid-1-node-uuid-2',
      },
      'node-uuid-3-node-uuid-4': {
        id: 'node-uuid-3-node-uuid-4',
      },
    };
    const action = removeEdge('petri-net-uuid', 'node-uuid-3-node-uuid-4');
    const stateAfter = {
      'node-uuid-1-node-uuid-2': {
        id: 'node-uuid-1-node-uuid-2',
      },
    };

    expect(edgesById(stateBefore, action)).toEqual(stateAfter);
  });
});
