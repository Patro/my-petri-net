import edgesById from './edgesById';
import { addEdge, setWeight, removeEdge } from '../actions';

describe('edges by id reducer', () => {
  it('should handle ADD_EDGE', () => {
    const stateBefore = {
      '1-2': {
        id: '1-2',
      },
    };
    const action = addEdge(0, 3, 4);
    const stateAfter = {
      '1-2': {
        id: '1-2',
      },
      '3-4': {
        id: '3-4',
        from: 3,
        to: 4,
        weight: 1,
      },
    };

    expect(edgesById(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SET_WEIGHT', () => {
    const stateBefore = {
      '1-2': {
        id: '1-2',
      },
      '3-4': {
        id: '3-4',
        weight: 1,
      },
    };
    const action = setWeight(0, '3-4', 2);
    const stateAfter = {
      '1-2': {
        id: '1-2',
      },
      '3-4': {
        id: '3-4',
        weight: 2,
      },
    };

    expect(edgesById(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle REMOVE_EDGE', () => {
    const stateBefore = {
      '1-2': {
        id: '1-2',
      },
      '3-4': {
        id: '3-4',
      },
    };
    const action = removeEdge(0, '3-4');
    const stateAfter = {
      '1-2': {
        id: '1-2',
      },
    };

    expect(edgesById(stateBefore, action)).toEqual(stateAfter);
  });
});
