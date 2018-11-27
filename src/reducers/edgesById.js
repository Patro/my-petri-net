import { ADD_EDGE, SET_WEIGHT } from '../actions';

const edgesById = (state = {}, action) => {
  switch(action.type) {
    case ADD_EDGE:
      return {
        ...state,
        [action.edgeId]: {
          id: action.edgeId,
          from: action.from,
          to: action.to,
          weight: 1,
        },
      };
    case SET_WEIGHT:
      return {
        ...state,
        [action.edgeId]: {
          ...state[action.edgeId],
          weight: action.weight,
        },
      };
    default:
      return state;
  };
};

export default edgesById;
