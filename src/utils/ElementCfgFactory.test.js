import ElementCfgFactory from './ElementCfgFactory';

describe('ElementCfgFactory', () => {
  describe('edge cfg', () => {
    it('should build edge cfg with given parameters', () => {
      const factory = new ElementCfgFactory();
      const params = {
        id: 'edge-cfg',
        source: 'node-a',
        target: 'node-b',
        weight: 4,
        selected: true,
        selectable: true,
        grabbable: true,
      };
      const expectedCfg = {
        group: 'edges',
        data: {
          id: 'edge-cfg',
          source: 'node-a',
          target: 'node-b',
          weight: 4
        },
        selected: true,
        selectable: true,
        grabbable: true,
      };

      const cfg = factory.edgeCfg(params);

      expect(cfg).toEqual(expectedCfg)
    });

    it('should return the same object if called with identical params', () => {
      const factory = new ElementCfgFactory();
      const params = {
        id: 'edge-cfg',
        source: 'node-a',
        target: 'node-b',
        weight: 4,
        selected: true,
        selectable: true,
        grabbable: true,
      };

      const cfgA = factory.edgeCfg(params);
      const cfgB = factory.edgeCfg({ ...params });

      expect(cfgA).toBe(cfgB);
    });

    it('should return different objects if called with different params', () => {
      const factory = new ElementCfgFactory();
      const params = {
        id: 'edge-cfg',
        source: 'node-a',
        target: 'node-b',
        weight: 4,
        selected: true,
        selectable: true,
        grabbable: true,
      };

      const cfgA = factory.edgeCfg(params);
      const cfgB = factory.edgeCfg({ ...params, weight: 2 });

      expect(cfgA).not.toBe(cfgB);
    });
  });

  describe('node cfg', () => {
    it('should build node cfg with given parameters', () => {
      const factory = new ElementCfgFactory();
      const params = {
        id: 'node-cfg',
        type: 'PLACE',
        label: 'My Node',
        numberOfTokens: 1,
        position: {
          x: 301,
          y: 502,
        },
        selected: true,
        selectable: true,
        grabbable: true,
        classes: 'my-class',
      };
      const expectedCfg = {
        group: 'nodes',
        data: {
          id: 'node-cfg',
          type: 'PLACE',
          label: 'My Node',
          numberOfTokens: 1,
        },
        position: {
          x: 301,
          y: 502,
        },
        selected: true,
        selectable: true,
        grabbable: true,
        classes: 'my-class',
      };

      const cfg = factory.nodeCfg(params);

      expect(cfg).toEqual(expectedCfg)
    });

    it('should return the same object if called with identical params', () => {
      const factory = new ElementCfgFactory();
      const params = {
        id: 'node-cfg',
        type: 'PLACE',
        label: 'My Node',
        numberOfTokens: 1,
        position: {
          x: 301,
          y: 502,
        },
        selected: true,
        selectable: true,
        grabbable: true,
        classes: 'my-class',
      };

      const cfgA = factory.nodeCfg(params);
      const cfgB = factory.nodeCfg({ ...params });

      expect(cfgA).toBe(cfgB);
    });

    it('should return different objects if called with different params', () => {
      const factory = new ElementCfgFactory();
      const params = {
        id: 'node-cfg',
        type: 'PLACE',
        label: 'My Node',
        numberOfTokens: 1,
        position: {
          x: 301,
          y: 502,
        },
        selected: true,
        selectable: true,
        grabbable: true,
        classes: 'my-class',
      };

      const cfgA = factory.nodeCfg(params);
      const cfgB = factory.nodeCfg({ ...params, classes: 'new-class' });

      expect(cfgA).not.toBe(cfgB);
    });
  });
});
