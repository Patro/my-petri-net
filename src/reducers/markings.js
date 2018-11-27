import { SET_INITIAL_NUMBER_OF_TOKENS } from '../actions';

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
    default:
      return state;
  };
};

export default markings;
