import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setWeight, removeEdge } from '../actions';
import { getCurrentPetriNetId } from '../selectors';
import EdgeForm from '../components/EdgeForm';

const mapStateToProps = (state, ownProps) => {
  const edge = state.petriNetsById[getCurrentPetriNetId(ownProps)].edgesById[ownProps.edgeId]
  return {
    weight: edge.weight,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onWeightChange: weight => (
    dispatch(setWeight(getCurrentPetriNetId(ownProps), ownProps.edgeId, weight))
  ),
  onDelete: () => (
    dispatch(removeEdge(getCurrentPetriNetId(ownProps), ownProps.edgeId))
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EdgeForm));
