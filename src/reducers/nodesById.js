import { ADD_NODE, MOVE_NODE, SET_CAPACITY_LIMIT } from '../actions';

const nodesById = (state = {}, action) => {
  switch(action.type) {
    case ADD_NODE:
      return {
        ...state,
        [action.nodeId]: {
          id: action.nodeId,
          type: action.nodeType,
          position: action.position,
        },
      };
    case MOVE_NODE:
      return {
        ...state,
        [action.nodeId]: {
          ...state[action.nodeId],
          position: action.position,
        },
      };
    case SET_CAPACITY_LIMIT:
      return {
        ...state,
        [action.placeId]: {
          ...state[action.placeId],
          capacityLimit: action.capacityLimit,
        },
      };
    default:
      return state;
  };
};

export default nodesById;
