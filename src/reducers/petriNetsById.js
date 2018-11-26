import { ADD_PETRI_NET } from '../actions';

const initialState = {};

const petriNetsByIds = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PETRI_NET:
      return {
        ...state,
        [action.petriNetId]: {
          id: action.petriNetId,
          name: action.name
        }
      };
    default:
      return state;
  };
};

export default petriNetsByIds;