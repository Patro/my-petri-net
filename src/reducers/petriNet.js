import { ADD_EDGE } from '../actions';
import edgesById from './edgesById';

const petriNet = (state, action) => {
  switch(action.type) {
    case ADD_EDGE:
      return {
        ...state,
        edgesById: edgesById(state['edgesById'], action),
      }
    default:
      return state;
  };
};

export default petriNet;