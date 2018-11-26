import { combineReducers } from 'redux';
import petriNets from './petriNets';
import petriNetsById from './petriNetsById';

export default combineReducers({
  petriNets,
  petriNetsById,
});
