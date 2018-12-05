import petriNetsById from './petriNetsById';
import petriNet from './petriNet';
import { addPetriNet, addEdge } from '../actions';

jest.mock('./petriNet');

describe('petri nets by id reducer', () => {
  it('should handle ADD_PETRI_NET', () => {
    const stateBefore = {
      'petri-net-uuid-1': {
        id: 'petri-net-uuid-1',
      },
    };
    const action = addPetriNet('My Petri Net');
    const stateAfter = {
      'petri-net-uuid-1': {
        id: 'petri-net-uuid-1',
      },
      [action.petriNetId]: {
        id: action.petriNetId,
        name: 'My Petri Net',
        edgesById: {},
        nodesById: {},
        markings: [{}],
      },
    };

    expect(petriNetsById(stateBefore, action)).toEqual(stateAfter);
  });

  describe('petri net actions', () => {
    beforeEach(() => {
      petriNet.mockImplementation((state, action) => ('mocked return value'));
    });

    it('should delegate petri net actions to petri net reducer', () => {
      const stateBefore = {
        'petri-net-uuid-1': {
          id: 'petri-net-uuid-1',
        },
        'petri-net-uuid-2': {
          id: 'petri-net-uuid-2',
        },
      };
      const action = addEdge('petri-net-uuid-1', 'node-uuid-1', 'node-uuid-2');
      const stateAfter = {
        'petri-net-uuid-1': 'mocked return value',
        'petri-net-uuid-2': {
          id: 'petri-net-uuid-2',
        },
      };

      expect(petriNetsById(stateBefore, action)).toEqual(stateAfter);
    });

    it('should return existing state if petri net id is undefined', () => {
      const stateBefore = {
        'petri-net-uuid-1': {
          id: 'petri-net-uuid-1',
        },
        'petri-net-uuid-2': {
          id: 'petri-net-uuid-2',
        },
      };
      const action = addEdge(undefined, 'node-uuid-1', 'node-uuid-2');

      expect(petriNetsById(stateBefore, action)).toBe(stateBefore);
    });

    it('should return existing state if petri net reducer is returning the existing state', () => {
      const stateBefore = {
        'petri-net-uuid-1': {
          id: 'petri-net-uuid-1',
        },
        'petri-net-uuid-2': {
          id: 'petri-net-uuid-2',
        },
      };
      petriNet.mockImplementation((state, action) => stateBefore['petri-net-uuid-1']);
      const action = addEdge('petri-net-uuid-1', 'node-uuid-1', 'node-uuid-2');

      expect(petriNetsById(stateBefore, action)).toBe(stateBefore);
    });
  });
});
