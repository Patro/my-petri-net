import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PetriNetMenu from '../components/PetriNetMenu';
import { getPetriNets } from '../selectors';

const mapStateToProps = (state, ownProps) => ({
  petriNets: getPetriNets(state),
  selectedId: ownProps.match.params.id,
});

const mapDispatchToProps = (_, ownProps) => ({
  onSelect: id => ownProps.history.push('/' + id),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PetriNetMenu));
