import { ADD_EDGE } from '../actions';

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
    default:
      return state;
  };
};

export default edgesById;