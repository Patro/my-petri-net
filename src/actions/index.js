import uuidv4 from 'uuid/v4';

export const ADD_PETRI_NET = 'ADD_PETRI_NET';
export const ADD_EDGE = 'ADD_EDGE';
export const SET_WEIGHT = 'SET_WEIGHT';
export const REMOVE_EDGE = 'REMOVE_EDGE';
export const ADD_NODE = 'ADD_NODE';
export const MOVE_NODE = 'MOVE_NODE';
export const REMOVE_NODE = 'REMOVE_NODE';
export const SET_LABEL = 'SET_LABEL';
export const SET_CAPACITY_LIMIT = 'SET_CAPACITY_LIMIT';
export const REMOVE_CAPACITY_LIMIT = 'REMOVE_CAPACITY_LIMIT';
export const SET_INITIAL_NUMBER_OF_TOKENS = 'SET_INITIAL_NUMBER_OF_TOKENS';
export const RESET_MARKINGS = 'RESET_MARKINGS';
export const FIRE_TRANSITION = 'FIRE_TRANSITIONS';

export const addPetriNet = name => ({
  type: ADD_PETRI_NET,
  petriNetId: uuidv4(),
  name,
});

export const addEdge = (petriNetId, from, to) => ({
  type: ADD_EDGE,
  petriNetId,
  edgeId: `${from}_${to}`,
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

export const addNode = (petriNetId, nodeId, nodeType, position) => ({
  type: ADD_NODE,
  petriNetId,
  nodeId,
  nodeType,
  position,
});

export const moveNode = (petriNetId, nodeId, position) => ({
  type: MOVE_NODE,
  petriNetId,
  nodeId,
  position,
});

export const removeNode = (petriNetId, nodeId) => ({
  type: REMOVE_NODE,
  petriNetId,
  nodeId,
});

export const setLabel = (petriNetId, nodeId, label) => ({
  type: SET_LABEL,
  petriNetId,
  nodeId,
  label,
});

export const setCapacityLimit = (petriNetId, placeId, capacityLimit) => ({
  type: SET_CAPACITY_LIMIT,
  petriNetId,
  placeId,
  capacityLimit,
});

export const removeCapacityLimit = (petriNetId, placeId) => ({
  type: REMOVE_CAPACITY_LIMIT,
  petriNetId,
  placeId,
});

export const setInitialNumberOfTokens = (petriNetId, placeId, numberOfTokens) => ({
  type: SET_INITIAL_NUMBER_OF_TOKENS,
  petriNetId,
  placeId,
  numberOfTokens,
});

export const resetMarkings = (petriNetId) => ({
  type: RESET_MARKINGS,
  petriNetId,
});

export const fireTransition = (petriNetId, transitionId) => ({
  type: FIRE_TRANSITION,
  petriNetId,
  transitionId,
});
