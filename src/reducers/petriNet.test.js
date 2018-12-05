import petriNet from './petriNet';
import edgesById from './edgesById';
import nodesById from './nodesById';
import markings from './markings';
import { fireTransition, addEdge } from '../actions';
import * as nodeTypes from '../constants/nodeTypes';

jest.mock('./edgesById');
jest.mock('./nodesById');
jest.mock('./markings');

describe('petri net reducer', () => {
  describe('should handle FIRE_TRANSITION', () => {
    it('with no edge', () => {
      const stateBefore = {
        id: 'petri-net-uuid',
        edgesById: {},
        nodesById: {
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [{}],
      };
      const action = fireTransition('petri-net-uuid', 'transition-uuid');
      const stateAfter = {
        id: 'petri-net-uuid',
        edgesById: {},
        nodesById: {
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [{}, {}],
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('with incoming edge', () => {
      const stateBefore = {
        id: 'petri-net-uuid',
        edgesById: {
          'place-uuid_transition-uuid': {
            id: 'place-uuid_transition-uuid',
            from: 'place-uuid',
            to: 'transition-uuid',
            weight: 2,
          },
        },
        nodesById: {
          'place-uuid': {
            id: 'place-uuid',
            type: nodeTypes.PLACE,
          },
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            'place-uuid': 3,
          },
        ],
      };
      const action = fireTransition('petri-net-uuid', 'transition-uuid');
      const stateAfter = {
        id: 'petri-net-uuid',
        edgesById: {
          'place-uuid_transition-uuid': {
            id: 'place-uuid_transition-uuid',
            from: 'place-uuid',
            to: 'transition-uuid',
            weight: 2,
          },
        },
        nodesById: {
          'place-uuid': {
            id: 'place-uuid',
            type: nodeTypes.PLACE,
          },
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            'place-uuid': 3,
          },
          {
            'place-uuid': 1,
          },
        ],
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('with outgoing edge', () => {
      const stateBefore = {
        id: 'petri-net-uuid',
        edgesById: {
          'transition-uuid_place-uuid': {
            id: 'transition-uuid_place-uuid',
            from: 'transition-uuid',
            to: 'place-uuid',
            weight: 2,
          },
        },
        nodesById: {
          'place-uuid': {
            id: 'place-uuid',
            type: nodeTypes.PLACE,
          },
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            'place-uuid': 1,
          },
        ],
      };
      const action = fireTransition('petri-net-uuid', 'transition-uuid');
      const stateAfter = {
        id: 'petri-net-uuid',
        edgesById: {
          'transition-uuid_place-uuid': {
            id: 'transition-uuid_place-uuid',
            from: 'transition-uuid',
            to: 'place-uuid',
            weight: 2,
          },
        },
        nodesById: {
          'place-uuid': {
            id: 'place-uuid',
            type: nodeTypes.PLACE,
          },
          'transition-uuid': {
            id: 'transition-uuid',
            type: nodeTypes.TRANSITION,
          },
        },
        markings: [
          {
            'place-uuid': 1,
          },
          {
            'place-uuid': 3,
          },
        ],
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('delegated actions', () => {
    beforeEach(() => {
      edgesById.mockImplementation((state, action) => ('mocked return value of edges by id'));
      nodesById.mockImplementation((state, action) => ('mocked return value of nodes by id'));
      markings.mockImplementation((state, action) => ('mocked return value of markings'));
    });

    it('should delegate actions to descendant reducers', () => {
      const stateBefore = {
        id: 'petri-net-uuid',
        edgesById: {},
        nodesById: {},
        markings: {},
      };
      const action = addEdge('petri-net-uuid', 'node-uuid-1', 'node-uuid-2');
      edgesById.mockImplementation((state, action) => ('mocked return value of edges by id'));
      nodesById.mockImplementation((state, action) => ('mocked return value of nodes by id'));
      markings.mockImplementation((state, action) => ('mocked return value of markings'));
      const stateAfter = {
        id: 'petri-net-uuid',
        edgesById: 'mocked return value of edges by id',
        nodesById: 'mocked return value of nodes by id',
        markings: 'mocked return value of markings',
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should return existing state if descendant reducers return existing state', () => {
      const stateBefore = {
        id: 'petri-net-uuid',
        edgesById: {},
        nodesById: {},
        markings: {},
      };
      const action = addEdge('petri-net-uuid', 'node-uuid-1', 'node-uuid-2');
      edgesById.mockImplementation((state, action) => stateBefore.edgesById);
      nodesById.mockImplementation((state, action) => stateBefore.nodesById);
      markings.mockImplementation((state, action) => stateBefore.markings);

      expect(petriNet(stateBefore, action)).toBe(stateBefore);
    });

    it('should return new state if edges by id reducer returns new state', () => {
      const stateBefore = {
        id: 'petri-net-uuid',
        edgesById: 'prev state',
        nodesById: 'prev state',
        markings: 'prev state',
      };
      const action = addEdge('petri-net-uuid', 'node-uuid-1', 'node-uuid-2');
      edgesById.mockImplementation((state, action) => 'new state');
      nodesById.mockImplementation((state, action) => stateBefore.nodesById);
      markings.mockImplementation((state, action) => stateBefore.markings);
      const stateAfter = {
        id: 'petri-net-uuid',
        edgesById: 'new state',
        nodesById: 'prev state',
        markings: 'prev state',
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should return new state if nodes by id reducer returns new state', () => {
      const stateBefore = {
        id: 'petri-net-uuid',
        edgesById: 'prev state',
        nodesById: 'prev state',
        markings: 'prev state',
      };
      const action = addEdge('petri-net-uuid', 'node-uuid-1', 'node-uuid-2');
      edgesById.mockImplementation((state, action) => stateBefore.edgesById);
      nodesById.mockImplementation((state, action) => 'new state');
      markings.mockImplementation((state, action) => stateBefore.markings);
      const stateAfter = {
        id: 'petri-net-uuid',
        edgesById: 'prev state',
        nodesById: 'new state',
        markings: 'prev state',
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should return new state if markings reducer returns new state', () => {
      const stateBefore = {
        id: 'petri-net-uuid',
        edgesById: 'prev state',
        nodesById: 'prev state',
        markings: 'prev state',
      };
      const action = addEdge('petri-net-uuid', 'node-uuid-1', 'node-uuid-2');
      edgesById.mockImplementation((state, action) => stateBefore.edgesById);
      nodesById.mockImplementation((state, action) => stateBefore.nodesById);
      markings.mockImplementation((state, action) => 'new state');
      const stateAfter = {
        id: 'petri-net-uuid',
        edgesById: 'prev state',
        nodesById: 'prev state',
        markings: 'new state',
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });
  });
});
