import markings from './markings';
import {
  addNode, removeNode,
  setCapacityLimit,
  setInitialNumberOfTokens, resetMarkings,
} from '../actions';
import * as nodeTypes from '../constants/nodeTypes';

describe('markings reducer', () => {
  describe('should handle ADD_NODE', () => {
    it('with undefined state', () => {
      const stateBefore = undefined;
      const action = addNode(0, nodeTypes.TRANSITION, {x: 200, y: 400});
      const stateAfter = [
        {
          [action.nodeId]: 0,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });

    it('with existing markings', () => {
      const stateBefore = [
        {
          0: 1,
          1: 3,
        },
        {
          0: 3,
          1: 2,
        }
      ];
      const action = addNode(0, nodeTypes.TRANSITION, {x: 200, y: 400});
      const stateAfter = [
        {
          0: 1,
          1: 3,
          [action.nodeId]: 0,
        },
        {
          0: 3,
          1: 2,
          [action.nodeId]: 0,
        }
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });
  });

  it('should handle REMOVE_NODE', () => {
    const stateBefore = [
      {
        0: 1,
        1: 5,
        2: 1,
      },
      {
        0: 3,
        1: 2,
        2: 6,
      },
      {
        0: 5,
        1: 1,
        2: 0,
      },
    ];
    const action = removeNode(0, 1);
    const stateAfter = [
      {
        0: 1,
        2: 1,
      },
      {
        0: 3,
        2: 6,
      },
      {
        0: 5,
        2: 0,
      },
    ];

    expect(markings(stateBefore, action)).toEqual(stateAfter);
  });

  describe('should handle SET_CAPACITY_LIMIT', () => {
    it('with number of tokens that is below limit', () => {
      const stateBefore = [
        {
          0: 1,
          1: 3,
          2: 1,
        },
      ];
      const action = setCapacityLimit(0, 1, 4);
      const stateAfter = [
        {
          0: 1,
          1: 3,
          2: 1,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });

    it('with number of tokens that matches limit', () => {
      const stateBefore = [
        {
          0: 1,
          1: 4,
          2: 1,
        },
      ];
      const action = setCapacityLimit(0, 1, 4);
      const stateAfter = [
        {
          0: 1,
          1: 4,
          2: 1,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });

    it('with number of tokens that exceeds limit', () => {
      const stateBefore = [
        {
          0: 1,
          1: 5,
          2: 1,
        },
      ];
      const action = setCapacityLimit(0, 1, 4);
      const stateAfter = [
        {
          0: 1,
          1: 4,
          2: 1,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('should handle ADD_INITIAL_NUMBER_OF_TOKENS', () => {
    it('with undefined state', () => {
      const stateBefore = undefined;
      const action = setInitialNumberOfTokens(0, 1, 5);
      const stateAfter = [
        {
          1: 5,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });

    it('with existing initial marking', () => {
      const stateBefore = [
        {
          0: 1,
          1: 3,
        },
        {
          0: 3,
          1: 2,
        }
      ];
      const action = setInitialNumberOfTokens(0, 1, 5);
      const stateAfter = [
        {
          0: 1,
          1: 5,
        },
        {
          0: 3,
          1: 2,
        }
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });
  });

  it('should handle RESET_MARKINGS', () => {
    const stateBefore = [
      {
        0: 1,
        1: 5,
      },
      {
        0: 3,
        1: 2,
      },
      {
        0: 5,
        1: 1,
      },
    ];
    const action = resetMarkings(0);
    const stateAfter = [
      {
        0: 1,
        1: 5,
      },
    ];

    expect(markings(stateBefore, action)).toEqual(stateAfter);
  });
});
