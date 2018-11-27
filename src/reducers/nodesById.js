import { ADD_NODE } from '../actions';

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
    default:
      return state;
  };
};

export default nodesById;
