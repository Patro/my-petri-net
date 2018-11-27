import petriNetsById from './petriNetsById';
import petriNet from './petriNet';
import { addPetriNet, addEdge } from '../actions';

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
  });
});