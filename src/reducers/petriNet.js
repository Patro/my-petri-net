import edgesById from './edgesById';
import nodesById from './nodesById';
import markings from './markings';
import { FIRE_TRANSITION } from '../actions';
import { getIncomingEdges, getOutgoingEdges } from '../selectors/petriNet';

const petriNet = (state, action) => {
  switch(action.type) {
    case FIRE_TRANSITION: {
      let nextMarking = { ...state.markings[state.markings.length-1] };

      const incoming = getIncomingEdges(state, action.transitionId);
      incoming.forEach(edge => nextMarking[edge.from] -= edge.weight);

      const outgoing = getOutgoingEdges(state, action.transitionId);
      outgoing.forEach(edge => nextMarking[edge.to] += edge.weight);

      return {
        ...state,
        markings: [
          ...state.markings,
          nextMarking,
        ]
      }
    }
    default: {
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
    }
  }
};

export default petriNet;
