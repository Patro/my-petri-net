import { ADD_EDGE, SET_WEIGHT, REMOVE_EDGE, REMOVE_NODE } from '../actions';

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
    case REMOVE_EDGE: {
      const next = {...state};
      delete(next[action.edgeId]);
      return next;
    }
    case REMOVE_NODE: {
      const next = {...state};
      Object.values(state).forEach(edge => {
        if (edge.from === action.nodeId || edge.to === action.nodeId) {
          delete(next[edge.id]);
        }
      });
      return next;
    }
    default:
      return state;
  };
};

export default edgesById;
