import { getNumberOfTokens } from '../selectors/petriNet';

const elementByIdReducer = (obj, element) => {
  obj[element.data.id] = element;
  return obj;
};

class PetriNetToElementCfgsMapper {
  constructor(petriNet, factory, { selectedId, highlightedIds = [], locked = false }) {
    this.petriNet = petriNet;
    this.factory = factory;
    this.selectedId = selectedId;
    this.highlightedIds = highlightedIds;
    this.locked = locked;
  }

  edgeCfg(edge) {
    return this.factory.edgeCfg({
      id: edge.id,
      source: edge.from,
      target: edge.to,
      weight: edge.weight,
      selected: this.isSelected(edge.id),
      selectable: !this.locked,
      grabbable: !this.locked,
    });
  }

  edgeCfgsById() {
    const edges = Object.values(this.petriNet.edgesById);
    return edges.map(this.edgeCfg.bind(this)).reduce(elementByIdReducer, {});
  }

  isHighlighted = (id) => {
    return this.highlightedIds.indexOf(id) !== -1;
  }

  isSelected = (id) => {
    return this.selectedId === id;
  }

  map() {
    return {
      ...this.nodeCfgsById(),
      ...this.edgeCfgsById(),
    }
  }

  nodeCfg(node) {
    return this.factory.nodeCfg({
      id: node.id,
      type: node.type,
      label: this.nodeLabel(node),
      numberOfTokens: this.nodeNumberOfTokens(node),
      position: node.position,
      selected: this.isSelected(node.id),
      selectable: !this.locked,
      grabbable: !this.locked,
      classes: this.nodeClasses(node),
    });
  }

  nodeCfgsById = () => {
    const nodes = Object.values(this.petriNet.nodesById);
    return nodes.map(this.nodeCfg.bind(this)).reduce(elementByIdReducer, {});
  }

  nodeClasses(node) {
    const classes = [node.type];
    if (this.isHighlighted(node.id)) {
      classes.push('highlighted');
    }
    return classes.join(' ');
  }

  nodeLabel = (node) => {
    let parts = [];
    if (node.label !== undefined && node.label.length > 0) {
      parts.push(node.label);
    }
    if (node.capacityLimit !== undefined) {
      parts.push(`(max. ${node.capacityLimit})`);
    }
    return parts.join(' ');
  }

  nodeNumberOfTokens = (node) => (
    getNumberOfTokens(this.petriNet, node.id)
  )
}

export default PetriNetToElementCfgsMapper;
