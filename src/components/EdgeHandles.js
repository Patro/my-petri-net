import { PureComponent } from 'react';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import CytoscapeContext from '../contexts/CytoscapeContext';

cytoscape.use(edgehandles);

class EdgeHandles extends PureComponent {
  static contextType = CytoscapeContext;

  constructor(props) {
    super(props);
    this.edgeParams = this.edgeParams.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  componentDidMount = () => {
    this.initEdgeHandles();
  }

  componentDidUpdate = () => {
    this.initEdgeHandles();
  }

  edgeParams(sourceNode, targetNode) {
    return this.props.edgeParams(sourceNode.id(), targetNode.id());
  }

  handleComplete(sourceNode, targetNode) {
    this.props.onAddEdge(sourceNode.id(), targetNode.id());
  }

  initEdgeHandles() {
    if (this.context === undefined) {
      return;
    }
    if (this.edgehandles !== undefined) {
      this.edgehandles.destroy();
    }

    this.edgehandles = this.context.edgehandles({
      complete: this.handleComplete,
      edgeParams: this.edgeParams,
      snap: this.props.snap,
    });
  }

  render() {
    return null;
  }
}

export default EdgeHandles;
