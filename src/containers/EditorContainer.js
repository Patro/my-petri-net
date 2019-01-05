import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addEdge, addNode, moveNode } from '../actions';
import { getCurrentPetriNet, getCurrentPetriNetId } from '../selectors';
import Editor from '../components/Editor';

const mapStateToProps = (state, ownProps) => ({
  petriNet: getCurrentPetriNet(state, ownProps),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddEdge: (from, to) => dispatch(
    addEdge(getCurrentPetriNetId(ownProps), from, to)
  ),
  onAddNode: (nodeId, nodeType, position) => dispatch(
    addNode(getCurrentPetriNetId(ownProps), nodeId, nodeType, position)
  ),
  onMove: (id, position) => dispatch(
    moveNode(getCurrentPetriNetId(ownProps), id, position)
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor));
