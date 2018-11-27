import petriNet from './petriNet';
import {
  ADD_PETRI_NET, ADD_EDGE, SET_WEIGHT, REMOVE_EDGE,
  ADD_NODE, MOVE_NODE, REMOVE_NODE,
  SET_CAPACITY_LIMIT, REMOVE_CAPACITY_LIMIT,
  SET_INITIAL_NUMBER_OF_TOKENS,
} from '../actions';

const initialState = {};

const petriNetsByIds = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PETRI_NET:
      return {
        ...state,
        [action.petriNetId]: {
          id: action.petriNetId,
          name: action.name
        }
      };
    case ADD_EDGE:
    case SET_WEIGHT:
    case REMOVE_EDGE:
    case ADD_NODE:
    case MOVE_NODE:
    case REMOVE_NODE:
    case SET_CAPACITY_LIMIT:
    case REMOVE_CAPACITY_LIMIT:
    case SET_INITIAL_NUMBER_OF_TOKENS:
      return {
        ...state,
        [action.petriNetId]: petriNet(state[action.petriNetId], action),
      };
    default:
      return state;
  };
};

export default petriNetsByIds;
