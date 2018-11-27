import { ADD_EDGE, SET_WEIGHT } from '../actions';
import edgesById from './edgesById';

const petriNet = (state, action) => {
  switch(action.type) {
    case ADD_EDGE:
    case SET_WEIGHT:
      return {
        ...state,
        edgesById: edgesById(state['edgesById'], action),
      }
    default:
      return state;
  };
};

export default petriNet;
