import uuidv4 from 'uuid/v4';

export const ADD_PETRI_NET = 'ADD_PETRI_NET';
export const ADD_EDGE = 'ADD_EDGE';
export const SET_WEIGHT = 'SET_WEIGHT';
export const REMOVE_EDGE = 'REMOVE_EDGE';
export const ADD_NODE = 'ADD_NODE';

export const addPetriNet = name => ({
  type: ADD_PETRI_NET,
  petriNetId: uuidv4(),
  name,
});

export const addEdge = (petriNetId, from, to) => ({
  type: ADD_EDGE,
  petriNetId,
  edgeId: `$(from)-$(to)`,
  from,
  to,
});

export const setWeight = (petriNetId, edgeId, weight) => ({
  type: SET_WEIGHT,
  petriNetId,
  edgeId,
  weight,
});

export const removeEdge = (petriNetId, edgeId) => ({
  type: REMOVE_EDGE,
  petriNetId,
  edgeId,
});

export const addNode = (petriNetId, nodeType, position) => ({
  type: ADD_NODE,
  petriNetId,
  nodeId: uuidv4(),
  nodeType,
  position,
});
