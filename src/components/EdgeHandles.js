import { PureComponent } from 'react';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import CytoscapeContext from '../contexts/CytoscapeContext';

cytoscape.use(edgehandles);

class EdgeHandles extends PureComponent {
  static contextType = CytoscapeContext;

  initEdgeHandles() {
    if (this.context === undefined) {
      return;
    }
    if (this.edgehandles !== undefined) {
      this.edgehandles.destroy();
    }

    this.edgehandles = this.context.edgehandles({
      snap: this.props.snap,
    });
  }

  componentDidMount = () => {
    this.initEdgeHandles();
  }

  componentDidUpdate = () => {
    this.initEdgeHandles();
  }

  render() {
    return null;
  }
}

export default EdgeHandles;
