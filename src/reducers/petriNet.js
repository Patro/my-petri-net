import {
  ADD_EDGE, SET_WEIGHT, REMOVE_EDGE,
  ADD_NODE, MOVE_NODE, SET_CAPACITY_LIMIT,
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
    case MOVE_NODE:
    case SET_CAPACITY_LIMIT:
      return {
        ...state,
        nodesById: nodesById(state['nodesById'], action),
      };
    default:
      return state;
  };
};

export default petriNet;
