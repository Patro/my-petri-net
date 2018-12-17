import ElementCfgFactory from './ElementCfgFactory';
import PetriNetToElementCfgsMapper from './PetriNetToElementCfgsMapper';

describe('PetriNetToElementCfgsMapper', () => {
  describe('edge', () => {
    const setupPetriNet = () => ({
      edgesById: {
        'edge-a': {
          id: 'edge-a',
          from: 'node-a',
          to: 'node-b',
          weight: 4,
        }
      },
      nodesById: {},
    });

    it('should map edge to element cfg', () => {
      const petriNet = setupPetriNet();
      const factory = new ElementCfgFactory();
      const mapper = new PetriNetToElementCfgsMapper(petriNet, factory, {});
      const expectedCfg = {
        'edge-a': {
          group: 'edges',
          data: {
            id: 'edge-a',
            source: 'node-a',
            target: 'node-b',
            weight: 4,
          },
          selected: false,
          selectable: true,
          grabbable: true,
        },
      };

      const cfg = mapper.map();

      expect(cfg).toEqual(expectedCfg);
    });

    it('should set selected to true if id matches given id in options', () => {
      const petriNet = setupPetriNet();
      const factory = new ElementCfgFactory();
      const mapper = new PetriNetToElementCfgsMapper(petriNet, factory, { selectedId: 'edge-a' });

      const cfg = mapper.map();

      expect(cfg['edge-a']).toMatchObject({ selected: true });
    });

    it('should set selectable and grabbable to false if locked option is true', () => {
      const petriNet = setupPetriNet();
      const factory = new ElementCfgFactory();
      const mapper = new PetriNetToElementCfgsMapper(petriNet, factory, { locked: true });

      const cfg = mapper.map();

      expect(cfg['edge-a']).toMatchObject({ selectable: false, grabbable: false });
    });
  });

  describe('node', () => {
    const setupPetriNet = () => ({
      edgesById: {},
      nodesById: {
        'node-a': {
          id: 'node-a',
          type: 'PLACE',
          label: 'My Node',
          position: {
            x: 100,
            y: 200,
          }
        }
      },
      markings: [
        {
          'node-a': 3,
        }
      ]
    });

    it('should map node to element cfg', () => {
      const petriNet = setupPetriNet();
      const factory = new ElementCfgFactory();
      const mapper = new PetriNetToElementCfgsMapper(petriNet, factory, {});
      const expectedCfg = {
        'node-a': {
          group: 'nodes',
          data: {
            id: 'node-a',
            type: 'PLACE',
            label: 'My Node',
            numberOfTokens: 3,
          },
          position: {
            x: 100,
            y: 200,
          },
          selected: false,
          selectable: true,
          grabbable: true,
          classes: 'PLACE',
        },
      };

      const cfg = mapper.map();

      expect(cfg).toEqual(expectedCfg);
    });

    it('should set selected to true if id matches given id in options', () => {
      const petriNet = setupPetriNet();
      const factory = new ElementCfgFactory();
      const mapper = new PetriNetToElementCfgsMapper(petriNet, factory, { selectedId: 'node-a' });

      const cfg = mapper.map();

      expect(cfg['node-a']).toMatchObject({ selected: true });
    });

    it('should add highlighted class if id is in highlightedId array of options', () => {
      const petriNet = setupPetriNet();
      const factory = new ElementCfgFactory();
      const mapper = new PetriNetToElementCfgsMapper(petriNet, factory, { highlightedIds: ['node-a'] });

      const cfg = mapper.map();

      expect(cfg['node-a']).toMatchObject({ classes: 'PLACE highlighted' });
    });

    it('should set selectable and grabbable to false if locked option is true', () => {
      const petriNet = setupPetriNet();
      const factory = new ElementCfgFactory();
      const mapper = new PetriNetToElementCfgsMapper(petriNet, factory, { locked: true });

      const cfg = mapper.map();

      expect(cfg['node-a']).toMatchObject({ selectable: false, grabbable: false });
    });
  });
});
