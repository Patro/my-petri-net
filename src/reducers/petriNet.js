import {
  ADD_EDGE, SET_WEIGHT, REMOVE_EDGE,
  ADD_NODE, MOVE_NODE, REMOVE_NODE,
  SET_CAPACITY_LIMIT, REMOVE_CAPACITY_LIMIT,
  SET_INITIAL_NUMBER_OF_TOKENS, RESET_MARKINGS,
} from '../actions';
import edgesById from './edgesById';
import nodesById from './nodesById';
import markings from './markings';

const petriNet = (state, action) => {
  switch(action.type) {
    case ADD_EDGE:
    case SET_WEIGHT:
    case REMOVE_EDGE:
      return {
        ...state,
        edgesById: edgesById(state['edgesById'], action),
      };
    case ADD_NODE:
      return {
        ...state,
        nodesById: nodesById(state['nodesById'], action),
        markings: markings(state['markings'], action),
      };
    case MOVE_NODE:
    case REMOVE_NODE:
    case SET_CAPACITY_LIMIT:
    case REMOVE_CAPACITY_LIMIT:
      return {
        ...state,
        nodesById: nodesById(state['nodesById'], action),
      };
    case SET_INITIAL_NUMBER_OF_TOKENS:
    case RESET_MARKINGS:
      return {
        ...state,
        markings: markings(state['markings'], action),
      };
    default:
      return state;
  };
};

export default petriNet;
