import petriNet from './petriNet';
import { ADD_PETRI_NET } from '../actions';

const initialState = {};

const petriNetsByIds = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PETRI_NET:
      return {
        ...state,
        [action.petriNetId]: {
          id: action.petriNetId,
          name: action.name,
          edgesById: {},
          nodesById: {},
          markings: [{}],
        },
      };
    default: {
      if (action.petriNetId === undefined) {
        return state;
      }

      let petriNetState = state[action.petriNetId];
      let reducedState = petriNet(state[action.petriNetId], action);
      if (petriNetState === reducedState) {
        return state;
      }

      return {
        ...state,
        [action.petriNetId]: reducedState,
      };
    }
  };
};

export default petriNetsByIds;
