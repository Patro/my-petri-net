import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeNode, setLabel } from '../actions';
import { getCurrentPetriNet, getCurrentPetriNetId } from '../selectors';
import TransitionForm from '../components/TransitionForm';

const mapStateToProps = (state, ownProps) => {
  const petriNet = getCurrentPetriNet(state, ownProps);
  const transition = petriNet.nodesById[ownProps.transitionId]
  return {
    label: transition.label,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLabelChange: label => (
    dispatch(
      setLabel(
        getCurrentPetriNetId(ownProps),
        ownProps.transitionId,
        label
      )
    )
  ),
  onDelete: () => (
    dispatch(
      removeNode(
        getCurrentPetriNetId(ownProps),
        ownProps.transitionId
      )
    )
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TransitionForm));
