export const getIncomingEdges = (state, nodeId) => (
  Object.values(state.edgesById).filter(edge => edge.to == nodeId)
);

export const getOutgoingEdges = (state, nodeId) => (
  Object.values(state.edgesById).filter(edge => edge.from == nodeId)
);

export const getNumberOfTokens = (state, placeId) => (
  state.markings[state.markings.length - 1][placeId]
);
