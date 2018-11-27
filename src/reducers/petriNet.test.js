import petriNet from './petriNet';
import edgesById from './edgesById';
import nodesById from './nodesById';
import markings from './markings';
import {
  addEdge, setWeight, removeEdge,
  addNode, moveNode, removeNode,
  setCapacityLimit, removeCapacityLimit,
  setInitialNumberOfTokens, resetMarkings,
} from '../actions';
import * as nodeTypes from '../constants/nodeTypes';

jest.mock('./edgesById');
jest.mock('./nodesById');
jest.mock('./markings');

describe('petri net reducer', () => {
  describe('delegated edge actions', () => {
    beforeEach(() => {
      edgesById.mockImplementation((state, action) => ('mocked return value'));
    });

    it('should delegate ADD_EDGE', () => {
      const stateBefore = {
        id: 0,
        edgesById: {},
      };
      const action = addEdge(0, 1, 2);
      const stateAfter = {
        id: 0,
        edgesById: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate SET_WEIGHT', () => {
      const stateBefore = {
        id: 0,
        edgesById: {},
      };
      const action = setWeight(0, 1, 2);
      const stateAfter = {
        id: 0,
        edgesById: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate REMOVE_EDGE', () => {
      const stateBefore = {
        id: 0,
        edgesById: {},
      };
      const action = removeEdge(0, 1);
      const stateAfter = {
        id: 0,
        edgesById: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('delegated node actions', () => {
    beforeEach(() => {
      nodesById.mockImplementation((state, action) => ('mocked return value'));
    });

    it('should delegate ADD_NODE', () => {
      const stateBefore = {
        id: 0,
        nodesById: {},
      };
      const action = addNode(0, nodeTypes.TRANSITION, {x: 200, y: 400});
      const stateAfter = {
        id: 0,
        nodesById: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate MOVE_NODE', () => {
      const stateBefore = {
        id: 0,
        nodesById: {},
      };
      const action = moveNode(0, 1, {x: 200, y: 400});
      const stateAfter = {
        id: 0,
        nodesById: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate REMOVE_NODE', () => {
      const stateBefore = {
        id: 0,
        nodesById: {},
      };
      const action = removeNode(0, 1);
      const stateAfter = {
        id: 0,
        nodesById: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate SET_CAPACITY_LIMIT', () => {
      const stateBefore = {
        id: 0,
        nodesById: {},
      };
      const action = setCapacityLimit(0, 1, 2);
      const stateAfter = {
        id: 0,
        nodesById: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate REMOVE_CAPACITY_LIMIT', () => {
      const stateBefore = {
        id: 0,
        nodesById: {},
      };
      const action = removeCapacityLimit(0, 1);
      const stateAfter = {
        id: 0,
        nodesById: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('delegated marking actions', () => {
    beforeEach(() => {
      markings.mockImplementation((state, action) => ('mocked return value'));
    });

    it('should delegate SET_INITIAL_NUMBER_OF_TOKENS', () => {
      const stateBefore = {
        id: 0,
      };
      const action = setInitialNumberOfTokens(0, 1, 3);
      const stateAfter = {
        id: 0,
        markings: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should delegate RESET_MARKINGS', () => {
      const stateBefore = {
        id: 0,
      };
      const action = resetMarkings(0);
      const stateAfter = {
        id: 0,
        markings: 'mocked return value'
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });
  });
});
