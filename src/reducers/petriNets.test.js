import petriNets from './petriNets';
import { addPetriNet } from '../actions';

describe('petri nets reducer', () => {
  it('should handle ADD_PETRI_NET', () => {
    const stateBefore = ['petri-net-uuid'];
    const action = addPetriNet('My Petri Net');
    const stateAfter = ['petri-net-uuid', action.petriNetId];

    expect(petriNets(stateBefore, action)).toEqual(stateAfter);
  });
});
