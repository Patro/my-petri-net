import * as nodeTypes from '../constants/nodeTypes';

export const getIncomingEdges = (state, nodeId) => (
  Object.values(state.edgesById).filter(edge => edge.to == nodeId)
);

export const getOutgoingEdges = (state, nodeId) => (
  Object.values(state.edgesById).filter(edge => edge.from == nodeId)
);

export const getNumberOfTokens = (state, placeId) => (
  state.markings[state.markings.length - 1][placeId]
);

const canTakeTokens = (state, placeId, numberOfTokens) => {
  const place = state.nodesById[placeId];
  if (place.capacityLimit == undefined) {
    return true;
  }
  const leftCapacity = place.capacityLimit - getNumberOfTokens(state, placeId);
  return leftCapacity >= numberOfTokens;
};

export const getActiveTransitions = (state) => {
  const all = Object.values(state.nodesById)
    .filter(node => node.type == nodeTypes.TRANSITION);
  const active = all.filter(transition => {
    const incoming = getIncomingEdges(state, transition.id);
    if (incoming.some((edge) => edge.weight > getNumberOfTokens(state, edge.from))) {
      return false;
    }

    let outgoing = getOutgoingEdges(state, transition.id);
    if (outgoing.some((edge) => !canTakeTokens(state, edge.to, edge.weight))) {
      return false;
    }

    return true;
  });
  return active;
};
