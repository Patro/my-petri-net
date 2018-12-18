import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  removeNode, setLabel,
  setCapacityLimit, removeCapacityLimit, setInitialNumberOfTokens
} from '../actions';
import PlaceForm from '../components/PlaceForm';
import { getCurrentPetriNet, getCurrentPetriNetId } from '../selectors/index';
import { getNumberOfTokens } from '../selectors/petriNet';

const mapStateToProps = (state, ownProps) => {
  const petriNet = getCurrentPetriNet(state, ownProps);
  const place = petriNet.nodesById[ownProps.placeId]
  return {
    label: place.label,
    capacityLimit: place.capacityLimit,
    numberOfTokens: getNumberOfTokens(petriNet, ownProps.placeId),
  };
};

const getCapacityLimitChangeAction = (props, capacity) => {
  const petriNetId = getCurrentPetriNetId(props);
  if (capacity === undefined || capacity === null || capacity === '') {
    return removeCapacityLimit(
      petriNetId,
      props.placeId
    );
  }
  else {
    return setCapacityLimit(
      petriNetId,
      props.placeId,
      capacity
    );
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLabelChange: label => (
    dispatch(
      setLabel(
        getCurrentPetriNetId(ownProps),
        ownProps.placeId,
        label
      )
    )
  ),
  onCapacityLimitChange: capacity => (
    dispatch(
      getCapacityLimitChangeAction(
        ownProps,
        capacity
      )
    )
  ),
  onNumberOfTokensChange: numberOfTokens => (
    dispatch(
      setInitialNumberOfTokens(
        getCurrentPetriNetId(ownProps),
        ownProps.placeId,
        numberOfTokens || 0
      )
    )
  ),
  onDelete: () => (
    dispatch(
      removeNode(
        getCurrentPetriNetId(ownProps),
        ownProps.placeId
      )
    )
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceForm));
