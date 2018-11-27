import {
  ADD_NODE, MOVE_NODE, REMOVE_NODE,
  SET_CAPACITY_LIMIT, REMOVE_CAPACITY_LIMIT,
} from '../actions';

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
    case REMOVE_NODE: {
      let next = {...state};
      delete(next[action.nodeId]);
      return next;
    }
    case SET_CAPACITY_LIMIT:
      return {
        ...state,
        [action.placeId]: {
          ...state[action.placeId],
          capacityLimit: action.capacityLimit,
        },
      };
    case REMOVE_CAPACITY_LIMIT: {
      let next = { ...state };
      delete(next[action.placeId].capacityLimit);
      return next;
    }
    default:
      return state;
  };
};

export default nodesById;
