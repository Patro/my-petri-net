import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addPetriNet } from '../actions';
import CreateBox from '../components/CreateBox';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCreate: name => {
    let action = addPetriNet(name);
    dispatch(action);
    ownProps.history.push('/' + action.petriNetId);
  }
});

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CreateBox));
