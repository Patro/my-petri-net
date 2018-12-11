import React, { PureComponent } from 'react';
import cytoscape from 'cytoscape';
import cloneDeep from 'lodash/cloneDeep';
import StaticDiv from './StaticDiv';

class Graph extends PureComponent {
  constructor(props) {
    super(props);
    this.cyContainerRef = React.createRef();
  }

  componentDidMount = () => {
    this.initCytoscape();
  }

  initCytoscape() {
    this.loaded = {
      elementsById: this.props.elementsById,
      layout: this.props.layout,
      style: this.props.style,
    }
    this.options = {
      container: this.cyContainerRef.current,
      elements: cloneDeep(Object.values(this.props.elementsById || {})),
      layout: cloneDeep(this.props.layout || {}),
      style: cloneDeep(this.props.style || {}),
    }
    this.cy = cytoscape(this.options);
  }

  render = () => {
    return (
      <div className="graph">
        <StaticDiv className="cytoscape_container" divRef={this.cyContainerRef} />
      </div>
    );
  }
}

export default Graph;
