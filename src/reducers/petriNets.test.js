import petriNets from './petriNets';
import { addPetriNet } from '../actions';

describe('petri nets reducer', () => {
  it('should handle ADD_PETRI_NET', () => {
    const stateBefore = [0];
    const action = addPetriNet('My Petri Net');
    const stateAfter = [0, action.petriNetId];

    expect(petriNets(stateBefore, action)).toEqual(stateAfter);
  });
});