import petriNet from './petriNet';
import { ADD_PETRI_NET, ADD_EDGE, SET_WEIGHT } from '../actions';

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
      return {
        ...state,
        [action.petriNetId]: petriNet(state[action.petriNetId], action),
      };
    default:
      return state;
  };
};

export default petriNetsByIds;
