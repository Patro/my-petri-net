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
      const action = addNode('petri-net-uuid', 'place-uuid', nodeTypes.PLACE, {x: 200, y: 400});
      const stateAfter = [
        {
          'place-uuid': 0,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });

    it('with existing markings', () => {
      const stateBefore = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 3,
        },
        {
          'place-uuid-1': 3,
          'place-uuid-2': 2,
        }
      ];
      const action = addNode('petri-net-uuid', 'place-uuid-3', nodeTypes.PLACE, {x: 200, y: 400});
      const stateAfter = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 3,
          'place-uuid-3': 0,
        },
        {
          'place-uuid-1': 3,
          'place-uuid-2': 2,
          'place-uuid-3': 0,
        }
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });
  });

  it('should handle REMOVE_NODE', () => {
    const stateBefore = [
      {
        'place-uuid-1': 1,
        'place-uuid-2': 5,
        'place-uuid-3': 1,
      },
      {
        'place-uuid-1': 3,
        'place-uuid-2': 2,
        'place-uuid-3': 6,
      },
      {
        'place-uuid-1': 5,
        'place-uuid-2': 1,
        'place-uuid-3': 0,
      },
    ];
    const action = removeNode('petri-net-uuid', 'place-uuid-2');
    const stateAfter = [
      {
        'place-uuid-1': 1,
        'place-uuid-3': 1,
      },
      {
        'place-uuid-1': 3,
        'place-uuid-3': 6,
      },
      {
        'place-uuid-1': 5,
        'place-uuid-3': 0,
      },
    ];

    expect(markings(stateBefore, action)).toEqual(stateAfter);
  });

  describe('should handle SET_CAPACITY_LIMIT', () => {
    it('with number of tokens that is below limit', () => {
      const stateBefore = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 3,
          'place-uuid-3': 1,
        },
      ];
      const action = setCapacityLimit('petri-net-uuid', 'place-uuid-2', 4);
      const stateAfter = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 3,
          'place-uuid-3': 1,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });

    it('with number of tokens that matches limit', () => {
      const stateBefore = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 4,
          'place-uuid-3': 1,
        },
      ];
      const action = setCapacityLimit('petri-net-uuid', 'place-uuid-2', 4);
      const stateAfter = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 4,
          'place-uuid-3': 1,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });

    it('with number of tokens that exceeds limit', () => {
      const stateBefore = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 5,
          'place-uuid-3': 1,
        },
      ];
      const action = setCapacityLimit('petri-net-uuid', 'place-uuid-2' , 4);
      const stateAfter = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 4,
          'place-uuid-3': 1,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('should handle ADD_INITIAL_NUMBER_OF_TOKENS', () => {
    it('with undefined state', () => {
      const stateBefore = undefined;
      const action = setInitialNumberOfTokens('petri-net-uuid', 'place-uuid-1', 5);
      const stateAfter = [
        {
          'place-uuid-1': 5,
        },
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });

    it('with existing initial marking', () => {
      const stateBefore = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 3,
        },
        {
          'place-uuid-1': 3,
          'place-uuid-2': 2,
        }
      ];
      const action = setInitialNumberOfTokens('petri-net-uuid', 'place-uuid-2', 5);
      const stateAfter = [
        {
          'place-uuid-1': 1,
          'place-uuid-2': 5,
        },
        {
          'place-uuid-1': 3,
          'place-uuid-2': 2,
        }
      ];

      expect(markings(stateBefore, action)).toEqual(stateAfter);
    });
  });

  it('should handle RESET_MARKINGS', () => {
    const stateBefore = [
      {
        'place-uuid-1': 1,
        'place-uuid-2': 5,
      },
      {
        'place-uuid-1': 3,
        'place-uuid-2': 2,
      },
      {
        'place-uuid-1': 5,
        'place-uuid-2': 1,
      },
    ];
    const action = resetMarkings(0);
    const stateAfter = [
      {
        'place-uuid-1': 1,
        'place-uuid-2': 5,
      },
    ];

    expect(markings(stateBefore, action)).toEqual(stateAfter);
  });
});
