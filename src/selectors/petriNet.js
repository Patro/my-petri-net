export const getIncomingEdges = (state, nodeId) => (
  Object.values(state.edgesById).filter(edge => edge.to == nodeId)
);

export const getOutgoingEdges = (state, nodeId) => (
  Object.values(state.edgesById).filter(edge => edge.from == nodeId)
);
