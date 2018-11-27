import petriNet from './petriNet';
import edgesById from './edgesById';
import nodesById from './nodesById';
import markings from './markings';
import { addEdge } from '../actions';

jest.mock('./edgesById');
jest.mock('./nodesById');
jest.mock('./markings');

describe('petri net reducer', () => {
  describe('delegated actions', () => {
    beforeEach(() => {
      edgesById.mockImplementation((state, action) => ('mocked return value of edges by id'));
      nodesById.mockImplementation((state, action) => ('mocked return value of nodes by id'));
      markings.mockImplementation((state, action) => ('mocked return value of markings'));
    });

    it('should delegate actions to descendant reducers', () => {
      const stateBefore = {
        id: 0,
        edgesById: {},
        nodesById: {},
        markings: {},
      };
      const action = addEdge(0, 1, 2);
      edgesById.mockImplementation((state, action) => ('mocked return value of edges by id'));
      nodesById.mockImplementation((state, action) => ('mocked return value of nodes by id'));
      markings.mockImplementation((state, action) => ('mocked return value of markings'));
      const stateAfter = {
        id: 0,
        edgesById: 'mocked return value of edges by id',
        nodesById: 'mocked return value of nodes by id',
        markings: 'mocked return value of markings',
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should return existing state if descendant reducers return existing state', () => {
      const stateBefore = {
        id: 0,
        edgesById: {},
        nodesById: {},
        markings: {},
      };
      const action = addEdge(0, 1, 2);
      edgesById.mockImplementation((state, action) => stateBefore.edgesById);
      nodesById.mockImplementation((state, action) => stateBefore.nodesById);
      markings.mockImplementation((state, action) => stateBefore.markings);

      expect(petriNet(stateBefore, action)).toBe(stateBefore);
    });

    it('should return new state if edges by id reducer returns new state', () => {
      const stateBefore = {
        id: 0,
        edgesById: 'prev state',
        nodesById: 'prev state',
        markings: 'prev state',
      };
      const action = addEdge(0, 1, 2);
      edgesById.mockImplementation((state, action) => 'new state');
      nodesById.mockImplementation((state, action) => stateBefore.nodesById);
      markings.mockImplementation((state, action) => stateBefore.markings);
      const stateAfter = {
        id: 0,
        edgesById: 'new state',
        nodesById: 'prev state',
        markings: 'prev state',
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should return new state if nodes by id reducer returns new state', () => {
      const stateBefore = {
        id: 0,
        edgesById: 'prev state',
        nodesById: 'prev state',
        markings: 'prev state',
      };
      const action = addEdge(0, 1, 2);
      edgesById.mockImplementation((state, action) => stateBefore.edgesById);
      nodesById.mockImplementation((state, action) => 'new state');
      markings.mockImplementation((state, action) => stateBefore.markings);
      const stateAfter = {
        id: 0,
        edgesById: 'prev state',
        nodesById: 'new state',
        markings: 'prev state',
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });

    it('should return new state if markings reducer returns new state', () => {
      const stateBefore = {
        id: 0,
        edgesById: 'prev state',
        nodesById: 'prev state',
        markings: 'prev state',
      };
      const action = addEdge(0, 1, 2);
      edgesById.mockImplementation((state, action) => stateBefore.edgesById);
      nodesById.mockImplementation((state, action) => stateBefore.nodesById);
      markings.mockImplementation((state, action) => 'new state');
      const stateAfter = {
        id: 0,
        edgesById: 'prev state',
        nodesById: 'prev state',
        markings: 'new state',
      };

      expect(petriNet(stateBefore, action)).toEqual(stateAfter);
    });
  });
});
