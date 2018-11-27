import edgesById from './edgesById';
import nodesById from './nodesById';
import markings from './markings';

const petriNet = (state, action) => {
  let next = {
    ...state,
    edgesById: edgesById(state['edgesById'], action),
    nodesById: nodesById(state['nodesById'], action),
    markings: markings(state['markings'], action),
  };
  let unchanged =
    next.edgesById === state.edgesById &&
    next.nodesById === state.nodesById &&
    next.markings === state.markings;
  if (unchanged) {
    return state;
  }
  return next;
};

export default petriNet;
