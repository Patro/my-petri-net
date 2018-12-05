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
        'node-uuid-1': {
          id: 'node-uuid-1',
        },
      };
      const action = addNode('petri-net-uuid', nodeTypes.TRANSITION, {x: 200, y: 400});
      const stateAfter = {
        'node-uuid-1': {
          id: 'node-uuid-1',
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
      const action = addNode('petri-net-uuid', nodeTypes.TRANSITION, position);
      const reducedState = nodesById(stateBefore, action);
      position.x = 400;

      expect(reducedState[action.nodeId].position.x).toEqual(200);
    });
  });

  describe('MOVE_NODE action handling', () => {
    it('should update position', () => {
      const stateBefore = {
        'node-uuid-1': {
          id: 'node-uuid-1',
        },
        'node-uuid-2': {
          id: 'node-uuid-2',
          position: {
            x: 100,
            y: 200,
          },
        },
      };
      const action = moveNode('petri-net-uuid', 'node-uuid-2', {x: 200, y: 400});
      const stateAfter = {
        'node-uuid-1': {
          id: 'node-uuid-1',
        },
        'node-uuid-2': {
          id: 'node-uuid-2',
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
        'node-uuid-1': {
          id: 'node-uuid-1',
          position: {
            x: 100,
            y: 200,
          },
        },
      };
      const position = {x: 200, y: 400};
      const action = moveNode('petri-net-uuid', 'node-uuid-1', position);
      const reducedState = nodesById(stateBefore, action);
      position.x = 400;

      expect(reducedState[action.nodeId].position.x).toEqual(200);
    });
  });

  it('should handle REMOVE_NODE', () => {
    const stateBefore = {
      'node-uuid-1': {
        id: 'node-uuid-1',
      },
      'node-uuid-2': {
        id: 'node-uuid-2',
      },
    };
    const action = removeNode('petri-net-uuid', 'node-uuid-2');
    const stateAfter = {
      'node-uuid-1': {
        id: 'node-uuid-1',
      },
    };

    expect(nodesById(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SET_CAPACITY_LIMIT', () => {
    const stateBefore = {
      'node-uuid-1': {
        id: 'node-uuid-1',
      },
      'node-uuid-2': {
        id: 'node-uuid-2',
      },
    };
    const action = setCapacityLimit('petri-net-uuid', 'node-uuid-2', 5);
    const stateAfter = {
      'node-uuid-1': {
        id: 'node-uuid-1',
      },
      'node-uuid-2': {
        id: 'node-uuid-2',
        capacityLimit: 5,
      },
    };

    expect(nodesById(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle REMOVE_CAPACITY_LIMIT', () => {
    const stateBefore = {
      'node-uuid-1': {
        id: 'node-uuid-1',
      },
      'node-uuid-2': {
        id: 'node-uuid-2',
        capacityLimit: 3,
      },
    };
    const action = removeCapacityLimit('petri-net-uuid', 'node-uuid-2');
    const stateAfter = {
      'node-uuid-1': {
        id: 'node-uuid-1',
      },
      'node-uuid-2': {
        id: 'node-uuid-2',
      },
    };

    expect(nodesById(stateBefore, action)).toEqual(stateAfter);
  });
});
