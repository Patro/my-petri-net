import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fireTransition, resetMarkings } from '../actions';
import { getCurrentPetriNetId } from '../selectors';
import Simulator from '../components/Simulator';

const mapStateToProps = (state, ownProps) => ({
  petriNet: state.petriNetsById[getCurrentPetriNetId(ownProps)],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFireTransition: (transitionId) => dispatch(
    fireTransition(getCurrentPetriNetId(ownProps), transitionId)
  ),
  onReset: () => dispatch(
    resetMarkings(getCurrentPetriNetId(ownProps))
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator));
