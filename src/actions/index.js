import uuidv4 from 'uuid/v4';

export const ADD_PETRI_NET = 'ADD_PETRI_NET';

export const addPetriNet = name => ({
  type: ADD_PETRI_NET,
  petriNetId: uuidv4(),
  name,
});