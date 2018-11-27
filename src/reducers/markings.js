import { SET_INITIAL_NUMBER_OF_TOKENS, RESET_MARKINGS } from '../actions';

const markings = (state = [{}], action) => {
  switch(action.type) {
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
