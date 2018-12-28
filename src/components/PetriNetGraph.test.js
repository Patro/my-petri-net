import React from 'react';
import { shallow } from 'enzyme';
import * as nodeType from '../constants/nodeTypes';
import Graph from './Graph';
import PetriNetGraph from './PetriNetGraph';
import EdgeHandles from './EdgeHandles';

describe('PetriNetGraph', () => {
  const setupNode = (id, type) => ({
    [id]: {
      id,
      type,
      label: 'My Node',
      position: {
        x: 100,
        y: 200,
      }
    },
  });
  const setupEdge = (from, to) => ({
    [`${from}_${to}`]: {
      id: `${from}_${to}`,
      from: from,
      to: to,
      weight: 4,
    }
  });
  const setupPetriNet = () => ({
    id: 'petri-net',
    nodesById: {
      ...setupNode('node-a', nodeType.PLACE),
      ...setupNode('node-b', nodeType.TRANSITION),
    },
    edgesById: {
      ...setupEdge('node-a', 'node-b')
    },
    markings: [
      {
        'node-a': 3,
        'node-b': 2,
      }
    ],
  });

  describe('graph', () => {
    it('should map petri net to graph', () => {
      const petriNet = setupPetriNet();
      const expectedElementsById = {
        'node-a_node-b': {
          group: 'edges',
          data: {
            id: 'node-a_node-b',
            source: 'node-a',
            target: 'node-b',
            weight: 4,
          },
          selected: true,
          selectable: true,
          grabbable: true,
        },
        'node-a': {
          group: 'nodes',
          data: {
            id: 'node-a',
            type: nodeType.PLACE,
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
          classes: nodeType.PLACE + ' highlighted',
        },
        'node-b': {
          group: 'nodes',
          data: {
            id: 'node-b',
            type: nodeType.TRANSITION,
            label: 'My Node',
            numberOfTokens: 2,
          },
          position: {
            x: 100,
            y: 200,
          },
          selected: false,
          selectable: true,
          grabbable: true,
          classes: nodeType.TRANSITION,
        },
      };

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} selectedId="node-a_node-b" highlightedIds={['node-a']} />);
      const graph = wrapper.find(Graph);

      expect(graph.props().elementsById).toEqual(expectedElementsById);
    });

    it('should forward click on background event', () => {
      const petriNet = setupPetriNet();
      const onClickOnBackground = jest.fn();

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} onClickOnBackground={onClickOnBackground} />);
      const graph = wrapper.find(Graph);
      graph.props().onClickOnBackground({ x: 200, y: 300 });

      expect(onClickOnBackground).toBeCalledWith({ x: 200, y: 300 });
    });

    it('should forward click on element event', () => {
      const petriNet = setupPetriNet();
      const onClickOnElement = jest.fn();

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} onClickOnElement={onClickOnElement} />);
      const graph = wrapper.find(Graph);
      graph.props().onClickOnElement('type', 'id');

      expect(onClickOnElement).toBeCalledWith('type', 'id');
    });

    it('should forward move event', () => {
      const petriNet = setupPetriNet();
      const onMove = jest.fn();

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} onMove={onMove} />);
      const graph = wrapper.find(Graph);
      graph.props().onMove('id', { x: 200, y: 300 });

      expect(onMove).toBeCalledWith('id', { x: 200, y: 300 });
    });

    it('should forward select event', () => {
      const petriNet = setupPetriNet();
      const onSelect = jest.fn();

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} onSelect={onSelect} />);
      const graph = wrapper.find(Graph);
      graph.props().onSelect('type', 'id');

      expect(onSelect).toBeCalledWith('type', 'id');
    });

    it('should forward unselect event', () => {
      const petriNet = setupPetriNet();
      const onUnselect = jest.fn();

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} onUnselect={onUnselect} />);
      const graph = wrapper.find(Graph);
      graph.props().onUnselect('type', 'id');

      expect(onUnselect).toBeCalledWith('type', 'id');
    });
  });

  describe('edge handles', () => {
    it('should render edge handles if locked prop is not set', () => {
      const petriNet = setupPetriNet();

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} />);
      const edgeHandles = wrapper.find(EdgeHandles);

      expect(edgeHandles.length).toBe(1);
    });

    it('should not render edge handles if locked prop is true', () => {
      const petriNet = setupPetriNet();

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} locked={true} />);
      const edgeHandles = wrapper.find(EdgeHandles);

      expect(edgeHandles.length).toBe(0);
    });

    it('should compose edge id out of source id and target id', () => {
      const petriNet = setupPetriNet();

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} />);
      const edgeHandles = wrapper.find(EdgeHandles);
      const edgeParams = edgeHandles.props().edgeParams('source-node-id', 'target-node-id');

      expect(edgeParams.data.id).toBe('source-node-id_target-node-id');
    });

    it('should permit edge between transition and place', () => {
      const petriNet = {
        id: 'petri-net',
        nodesById: {
          ...setupNode('node-a', nodeType.TRANSITION),
          ...setupNode('node-b', nodeType.PLACE),
        },
        edgesById: {},
        markings: [{}],
      };

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} />);
      const edgeHandles = wrapper.find(EdgeHandles);
      const shouldAddEdge = edgeHandles.props().shouldAddEdge('node-a', 'node-b');

      expect(shouldAddEdge).toBe(true);
    });

    it('should permit edge between place and transition', () => {
      const petriNet = {
        id: 'petri-net',
        nodesById: {
          ...setupNode('node-a', nodeType.PLACE),
          ...setupNode('node-b', nodeType.TRANSITION),
        },
        edgesById: {},
        markings: [{}],
      };

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} />);
      const edgeHandles = wrapper.find(EdgeHandles);
      const shouldAddEdge = edgeHandles.props().shouldAddEdge('node-a', 'node-b');

      expect(shouldAddEdge).toBe(true);
    });

    it('should deny loop', () => {
      const petriNet = {
        id: 'petri-net',
        nodesById: {
          ...setupNode('node-a', nodeType.TRANSITION),
        },
        edgesById: {},
        markings: [{}],
      };

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} />);
      const edgeHandles = wrapper.find(EdgeHandles);
      const shouldAddEdge = edgeHandles.props().shouldAddEdge('node-a', 'node-a');

      expect(shouldAddEdge).toBe(false);
    });

    it('should deny edge between transitions', () => {
      const petriNet = {
        id: 'petri-net',
        nodesById: {
          ...setupNode('node-a', nodeType.TRANSITION),
          ...setupNode('node-b', nodeType.TRANSITION),
        },
        edgesById: {},
        markings: [{}],
      };

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} />);
      const edgeHandles = wrapper.find(EdgeHandles);
      const shouldAddEdge = edgeHandles.props().shouldAddEdge('node-a', 'node-b');

      expect(shouldAddEdge).toBe(false);
    });

    it('should deny edge between places', () => {
      const petriNet = {
        id: 'petri-net',
        nodesById: {
          ...setupNode('node-a', nodeType.PLACE),
          ...setupNode('node-b', nodeType.PLACE),
        },
        edgesById: {},
        markings: [{}],
      };

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} />);
      const edgeHandles = wrapper.find(EdgeHandles);
      const shouldAddEdge = edgeHandles.props().shouldAddEdge('node-a', 'node-b');

      expect(shouldAddEdge).toBe(false);
    });

    it('should deny edge if an edge does already exist', () => {
      const petriNet = {
        id: 'petri-net',
        nodesById: {
          ...setupNode('node-a', nodeType.PLACE),
          ...setupNode('node-b', nodeType.TRANSITION),
        },
        edgesById: {
          ...setupEdge('node-a', 'node-b')
        },
        markings: [{}],
      };

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} />);
      const edgeHandles = wrapper.find(EdgeHandles);
      const shouldAddEdge = edgeHandles.props().shouldAddEdge('node-a', 'node-b');

      expect(shouldAddEdge).toBe(false);
    });

    it('should forward on add edge event', () => {
      const petriNet = setupPetriNet();
      const onAddEdge = jest.fn();

      const wrapper = shallow(<PetriNetGraph petriNet={petriNet} onAddEdge={onAddEdge} />);
      const edgeHandles = wrapper.find(EdgeHandles);
      edgeHandles.props().onAddEdge('node-a', 'node-b');

      expect(onAddEdge).toBeCalledWith('node-a', 'node-b');
    });
  });

  describe('children', () => {
    it('should render children', () => {
      const petriNet = setupPetriNet();

      const wrapper = shallow(
        <PetriNetGraph petriNet={petriNet}>
          <div className="test_div" />
        </PetriNetGraph>
      );

      expect(wrapper.find('.test_div').length).toBe(1);
    });
  });
});
