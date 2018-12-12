import React, { PureComponent } from 'react';
import cytoscape from 'cytoscape';
import cloneDeep from 'lodash/cloneDeep';
import changeDetector from '../utils/changeDetector';
import StaticDiv from './StaticDiv';

class Graph extends PureComponent {
  constructor(props) {
    super(props);
    this.cyContainerRef = React.createRef();
  }

  addElement(params) {
    this.cy.add(cloneDeep(params));
  }

  componentDidMount() {
    this.initCytoscape();
    this.setLoaded();
  }

  componentDidUpdate() {
    this.updateCytoscape();
    this.setLoaded();
  }

  findElement(params) {
    const elements = this.cy.elements(`#${params.data.id}`);
    if (elements.length === 1) {
      return elements.first();
    }
    else if (elements.length > 0) {
      throw new Error('ambiguous id');
    }
  }

  initCytoscape() {
    const elements = Object.values(this.props.elementsById || {});
    this.cy = cytoscape({
      container: this.cyContainerRef.current,
      elements: cloneDeep(elements),
      layout: cloneDeep(this.props.layout || {}),
      style: cloneDeep(this.props.style || {}),
    });
  }

  removeElement(params) {
    const element = this.findElement(params);
    if (element === undefined) {
      return;
    }

    element.remove();
  }

  render() {
    return (
      <div className="graph">
        <StaticDiv className="cytoscape_container" divRef={this.cyContainerRef} />
      </div>
    );
  }

  setLoaded() {
    this.loaded = {
      elementsById: this.props.elementsById,
      layout: this.props.layout,
      style: this.props.style,
    };
  }

  updateCytoscape() {
    this.updateElements();
    this.updateOptions();
  }

  updateElement(params) {
    const prevParams = this.loaded.elementsById[params.data.id];
    if (prevParams === params) {
      return;
    }

    const element = this.findElement(params);
    if (element === undefined) {
      return;
    }

    element.json(cloneDeep(params));
  }

  updateElements() {
    const prev = this.loaded.elementsById;
    const current = this.props.elementsById;
    if (prev === current) {
      return;
    }

    changeDetector.compareByKey({
      prev,
      current,
      onAdd: (params) => (
        this.findElement(params) ? this.updateElement(params) : this.addElement(params)
      ),
      onRemove: (params) => this.removeElement(params),
      onRemain: (params) => this.updateElement(params),
    });
  }

  updateOption(key) {
    if (this.props[key] === this.loaded[key]) {
      return;
    }

    this.cy[key](cloneDeep(this.props[key]));
  }

  updateOptions() {
    const optionsToUpdate = ['layout', 'style'];
    optionsToUpdate.map(key => this.updateOption(key));
  }
}

export default Graph;
