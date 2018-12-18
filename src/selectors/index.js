export const getCurrentPetriNet = (state, props) => (
  getPetriNet(state, getCurrentPetriNetId(props))
);

export const getCurrentPetriNetId = (props) => (
  props.match.params.id
);

export const getPetriNet = (state, id) => (
  state.petriNetsById[id]
);

export const getPetriNets = (state) => (
  state.petriNets.map(id => state.petriNetsById[id])
);
