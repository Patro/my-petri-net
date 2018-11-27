import {
  ADD_EDGE, SET_WEIGHT, REMOVE_EDGE,
  ADD_NODE,
} from '../actions';
import edgesById from './edgesById';
import nodesById from './nodesById';

const petriNet = (state, action) => {
  switch(action.type) {
    case ADD_EDGE:
    case SET_WEIGHT:
    case REMOVE_EDGE:
      return {
        ...state,
        edgesById: edgesById(state['edgesById'], action),
      }
    case ADD_NODE:
      return {
        ...state,
        nodesById: nodesById(state['nodesById'], action),
      };
    default:
      return state;
  };
};

export default petriNet;
