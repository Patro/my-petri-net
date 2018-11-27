import petriNetsById from './petriNetsById';
import petriNet from './petriNet';
import {
  addPetriNet, addEdge, setWeight, removeEdge,
  addNode, moveNode, setCapacityLimit,
} from '../actions';
import * as nodeTypes from '../constants/nodeTypes';

jest.mock('./petriNet');

describe('petri nets by id reducer', () => {
  it('should handle ADD_PETRI_NET', () => {
    const stateBefore = {
      0: {
        id: 0,
      },
    };
    const action = addPetriNet('My Petri Net');
    const stateAfter = {
      0: {
        id: 0,
      },
      [action.petriNetId]: {
        id: action.petriNetId,
        name: 'My Petri Net',
      },
    };

    expect(petriNetsById(stateBefore, action)).toEqual(stateAfter);
  });

  describe('delegated petri net actions', () => {
    beforeEach(() => {
      petriNet.mockImplementation((state, action) => ('mocked return value'));
    });

    it('should delegate ADD_EDGE', () => {
      const stateBefore = {
        0: {
          id: 0,
        },
        1: {
          id: 1,
        },
      };
      const action = addEdge(0, 1, 2);
      const stateAfter = {
        0: 'mocked return value',
        1: {
          id: 1,
        },
      };

      expect(petriNetsById(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate SET_WEIGHT', () => {
      const stateBefore = {
        0: {
          id: 0,
        },
        1: {
          id: 1,
        },
      };
      const action = setWeight(0, 1, 2);
      const stateAfter = {
        0: 'mocked return value',
        1: {
          id: 1,
        },
      };

      expect(petriNetsById(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate REMOVE_EDGE', () => {
      const stateBefore = {
        0: {
          id: 0,
        },
        1: {
          id: 1,
        },
      };
      const action = removeEdge(0, 1);
      const stateAfter = {
        0: 'mocked return value',
        1: {
          id: 1,
        },
      };

      expect(petriNetsById(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate ADD_NODE', () => {
      const stateBefore = {
        0: {
          id: 0,
        },
        1: {
          id: 1,
        },
      };
      const action = addNode(0, nodeTypes.TRANSITION, {x: 200, y: 400});
      const stateAfter = {
        0: 'mocked return value',
        1: {
          id: 1,
        },
      };

      expect(petriNetsById(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate MOVE_NODE', () => {
      const stateBefore = {
        0: {
          id: 0,
        },
        1: {
          id: 1,
        },
      };
      const action = moveNode(0, 1, {x: 200, y: 400});
      const stateAfter = {
        0: 'mocked return value',
        1: {
          id: 1,
        },
      };

      expect(petriNetsById(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate SET_CAPACITY_LIMIT', () => {
      const stateBefore = {
        0: {
          id: 0,
        },
        1: {
          id: 1,
        },
      };
      const action = setCapacityLimit(0, 1, 2);
      const stateAfter = {
        0: 'mocked return value',
        1: {
          id: 1,
        },
      };

      expect(petriNetsById(stateBefore, action)).toEqual(stateAfter);
    });
  });
});
