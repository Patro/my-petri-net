import nodesById from './nodesById';
import {
  addNode, moveNode, removeNode,
  setCapacityLimit, removeCapacityLimit,
} from '../actions';
import * as nodeTypes from '../constants/nodeTypes';

describe('nodes by id reducer', () => {
  describe('ADD_NODE action handling', () => {
    it('should add node', () => {
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

    it('should clone position from action', () => {
      const stateBefore = {};
      const position = {x: 200, y: 400};
      const action = addNode(0, nodeTypes.TRANSITION, position);
      const reducedState = nodesById(stateBefore, action);
      position.x = 400;

      expect(reducedState[action.nodeId].position.x).toEqual(200);
    });
  });

  describe('MOVE_NODE action handling', () => {
    it('should update position', () => {
      const stateBefore = {
        0: {
          id: 0,
        },
        1: {
          id: 1,
          position: {
            x: 100,
            y: 200,
          },
        },
      };
      const action = moveNode(0, 1, {x: 200, y: 400});
      const stateAfter = {
        0: {
          id: 0,
        },
        1: {
          id: 1,
          position: {
            x: 200,
            y: 400,
          },
        },
      };

      expect(nodesById(stateBefore, action)).toEqual(stateAfter);
    });

    it('should clone position from action', () => {
      const stateBefore = {
        1: {
          id: 1,
          position: {
            x: 100,
            y: 200,
          },
        },
      };
      const position = {x: 200, y: 400};
      const action = moveNode(0, 1, position);
      const reducedState = nodesById(stateBefore, action);
      position.x = 400;

      expect(reducedState[action.nodeId].position.x).toEqual(200);
    });
  });

  it('should handle REMOVE_NODE', () => {
    const stateBefore = {
      0: {
        id: 0,
      },
      1: {
        id: 1,
      },
    };
    const action = removeNode(0, 1);
    const stateAfter = {
      0: {
        id: 0,
      },
    };

    expect(nodesById(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SET_CAPACITY_LIMIT', () => {
    const stateBefore = {
      0: {
        id: 0,
      },
      1: {
        id: 1,
      },
    };
    const action = setCapacityLimit(0, 1, 5);
    const stateAfter = {
      0: {
        id: 0,
      },
      1: {
        id: 1,
        capacityLimit: 5,
      },
    };

    expect(nodesById(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle REMOVE_CAPACITY_LIMIT', () => {
    const stateBefore = {
      0: {
        id: 0,
      },
      1: {
        id: 1,
        capacityLimit: 3,
      },
    };
    const action = removeCapacityLimit(0, 1);
    const stateAfter = {
      0: {
        id: 0,
      },
      1: {
        id: 1,
      },
    };

    expect(nodesById(stateBefore, action)).toEqual(stateAfter);
  });
});
