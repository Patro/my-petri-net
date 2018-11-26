import petriNetsById from './petriNetsById';
import { addPetriNet } from '../actions';

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
});