import { ADD_PETRI_NET } from '../actions';

const initialState = []

const petriNets = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PETRI_NET:
      return [
        ...state,
        action.petriNetId,
      ];
    default:
      return state;
  };
};

export default petriNets;