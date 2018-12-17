import memoizee from 'memoizee';

class ElementCfgFactory {
  constructor() {
    const cacheOptions = { primitive: true, max: 100 };
    this._edgeCfg = memoizee(this._edgeCfg, cacheOptions);
    this._nodeCfg = memoizee(this._nodeCfg, cacheOptions);
  }

  _edgeCfg(id, source, target, weight, selected, selectable, grabbable) {
    return {
      group: "edges",
      data: { id, source, target, weight },
      selected,
      selectable,
      grabbable,
    };
  }

  edgeCfg({id, source, target, weight = 1, selected = false, selectable = true, grabbable = true}) {
    return this._edgeCfg(id, source, target, weight, selected, selectable, grabbable)
  }

  _nodeCfg(id, type, label, numberOfTokens, x, y, selected, selectable, grabbable, classes) {
    return {
      group: "nodes",
      data: { id, type, label, numberOfTokens },
      position: { x, y },
      selected,
      selectable,
      grabbable,
      classes,
    };
  }

  nodeCfg({id, type, label, numberOfTokens, position: {x, y}, selected = false, selectable = true, grabbable = true, classes}) {
    return this._nodeCfg(id, type, label, numberOfTokens, x, y, selected, selectable, grabbable, classes);
  }
}

export default ElementCfgFactory;
