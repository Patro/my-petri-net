import {
  ADD_NODE, REMOVE_NODE, SET_CAPACITY_LIMIT,
  SET_INITIAL_NUMBER_OF_TOKENS, RESET_MARKINGS
} from '../actions';

const markings = (state = [{}], action) => {
  switch(action.type) {
    case ADD_NODE:
      return state.map(marking => ({
        ...marking,
        [action.nodeId]: 0,
      }));
    case REMOVE_NODE:
      return state.map(marking => {
        let mapped = { ...marking };
        delete(mapped[action.nodeId]);
        return mapped;
      });
    case SET_CAPACITY_LIMIT:
      return state.map(marking => {
        if (marking[action.placeId] <= action.capacityLimit) {
          return marking;
        }
        return {
          ...marking,
          [action.placeId]: action.capacityLimit,
        };
      });
    case SET_INITIAL_NUMBER_OF_TOKENS: {
      let next = [...state];
      next[0] = {
        ...state[0],
        [action.placeId]: action.numberOfTokens,
      };
      return next;
    }
    case RESET_MARKINGS:
      return [
        state[0],
      ]
    default:
      return state;
  };
};

export default markings;
