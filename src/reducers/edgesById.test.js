import edgesById from './edgesById';
import { addEdge, setWeight } from '../actions';

describe('edges by id reducer', () => {
  it('should handle ADD_EDGE', () => {
    const stateBefore = {
      0: {
        id: 0,
      },
    };
    const action = addEdge(0, 1, 2);
    const stateAfter = {
      0: {
        id: 0,
      },
      [action.edgeId]: {
        id: action.edgeId,
        from: 1,
        to: 2,
        weight: 1,
      },
    };

    expect(edgesById(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SET_WEIGHT', () => {
    const stateBefore = {
      0: {
        id: 0,
      },
      1: {
        id: 1,
        weight: 1,
      },
    };
    const action = setWeight(0, 1, 2);
    const stateAfter = {
      0: {
        id: 0,
      },
      1: {
        id: 1,
        weight: 2,
      },
    };

    expect(edgesById(stateBefore, action)).toEqual(stateAfter);
  });
});
