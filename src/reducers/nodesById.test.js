import nodesById from './nodesById';
import { addNode } from '../actions';
import * as nodeTypes from '../constants/nodeTypes';

describe('nodes by id reducer', () => {
  it('should handle ADD_NODE', () => {
    const stateBefore = {
      0: {
        id: 0,
      },
    };
    const action = addNode(0, nodeTypes.TRANSITION, {x: 200, y: 400});
    const stateAfter = {
      0: {
        id: 0,
      },
      [action.nodeId]: {
        id: action.nodeId,
        type: nodeTypes.TRANSITION,
        position: {
          x: 200,
          y: 400,
        },
      },
    };

    expect(nodesById(stateBefore, action)).toEqual(stateAfter);
  });
});
