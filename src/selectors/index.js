export const getPetriNets = (state) => (
  state.petriNets.map(id => state.petriNetsById[id])
);
