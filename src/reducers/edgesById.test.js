import edgesById from './edgesById';
import { addEdge } from '../actions';

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
});