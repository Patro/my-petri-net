import React, { PureComponent } from 'react';
import cytoscape from 'cytoscape';
import cloneDeep from 'lodash/cloneDeep';
import CytoscapeContext from '../contexts/CytoscapeContext';
import changeDetector from '../utils/changeDetector';
import * as elementType from '../constants/elementTypes';
import StaticDiv from './StaticDiv';
import './Graph.css';

class Graph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.cyContainerRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  addElement(params) {
    this.cy.add(cloneDeep(params));
  }

  callCallback(callback, ...args) {
    if (callback === undefined) {
      return;
    }
    callback(...args);
  }

  componentDidMount() {
    this.initCytoscape();
    this.setLoaded();
  }

  componentDidUpdate() {
    this.updateCytoscape();
    this.setLoaded();
  }

  elementType(element) {
    return element.group() === 'nodes' ? elementType.NODE : elementType.EDGE;
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

  handleClick = (event) => {
    if (event.target === this.cy) {
      this.callCallback(this.props.onClickOnBackground, { ...event.position });
      return;
    }

    this.callCallback(this.props.onClickOnElement, this.elementType(event.target), event.target.id());
  }

  handleFree = (event) => {
    if (this.hasNodeMoved(event.target)) {
      this.callCallback(this.props.onMove, event.target.id(), { ...event.target.position() });
    }
  }

  handleGrab = (event) => {
    event.target.select();
  }

  handleSelect = (event) => {
    this.callCallback(this.props.onSelect, this.elementType(event.target), event.target.id());
  }

  handleUnselect = (event) => {
    this.callCallback(this.props.onUnselect, this.elementType(event.target), event.target.id());
  }

  hasNodeMoved(node) {
    const loadedPosition = this.loaded.elementsById[node.id()].position;
    return loadedPosition.x !== node.position().x || loadedPosition.y !== node.position().y;
  }

  initCytoscape() {
    const elements = Object.values(this.props.elementsById || {});
    this.cy = cytoscape({
      container: this.cyContainerRef.current,
      elements: cloneDeep(elements),
      layout: cloneDeep(this.props.layout || {}),
      maxZoom: this.props.maxZoom,
      style: cloneDeep(this.props.style || {}),
    });
    this.cy.on('free', this.handleFree);
    this.cy.on('grab', this.handleGrab);
    this.cy.on('select', this.handleSelect);
    this.cy.on('unselect', this.handleUnselect);
    this.cy.on('vclick', this.handleClick);

    this.setState({ cy: this.cy });
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
        <CytoscapeContext.Provider value={this.state.cy}>
          {this.props.children}
        </CytoscapeContext.Provider>
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
    const optionsToUpdate = ['layout', 'maxZoom', 'style'];
    optionsToUpdate.map(key => this.updateOption(key));
  }
}

export default Graph;
