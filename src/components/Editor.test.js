import React from 'react';
import { shallow } from 'enzyme';
import * as nodeType from '../constants/nodeTypes';
import Editor from './Editor';
import EditorToolbar from './EditorToolbar';
import PetriNetGraph from './PetriNetGraph';

describe('Editor', () => {
  describe('toolbar', () => {
    it('should render editor toolbar', () => {
      const wrapper = shallow(<Editor />);
      const toolbar = wrapper.find(EditorToolbar);

      expect(toolbar.length).toBe(1);
    });

    it('should set transition as default node type', () => {
      const wrapper = shallow(<Editor />);
      const toolbar = wrapper.find(EditorToolbar);

      expect(toolbar.props().activeNodeType).toEqual(nodeType.TRANSITION);
    });

    it('should update state on node type change', () => {
      const wrapper = shallow(<Editor />);
      const toolbar = wrapper.find(EditorToolbar);
      toolbar.props().onNodeTypeChange(nodeType.PLACE);

      expect(wrapper.state()).toMatchObject({ activeNodeType: nodeType.PLACE });
    });
  });

  describe('petri net graph', () => {
    it('should render petri net graph', () => {
      const wrapper = shallow(<Editor />);
      const petriNetGraph = wrapper.find(PetriNetGraph);

      expect(petriNetGraph.length).toBe(1);
    });

    it('should set petri net', () => {
      const petriNet = {};

      const wrapper = shallow(<Editor petriNet={petriNet} />);
      const petriNetGraph = wrapper.find(PetriNetGraph);

      expect(petriNetGraph.props().petriNet).toBe(petriNet);
    });

    it('should call on add node callback on click on background event', () => {
      const onAddNode = jest.fn();

      const wrapper = shallow(<Editor onAddNode={onAddNode} />);
      const petriNetGraph = wrapper.find(PetriNetGraph);
      petriNetGraph.props().onClickOnBackground({ x: 100, y: 200 });

      expect(onAddNode).toBeCalledWith(nodeType.TRANSITION, { x: 100, y: 200 });
    });

    it('should forward on add edge event', () => {
      const onAddEdge = jest.fn();

      const wrapper = shallow(<Editor onAddEdge={onAddEdge} />);
      const petriNetGraph = wrapper.find(PetriNetGraph);
      petriNetGraph.props().onAddEdge('node-a', 'node-b');

      expect(onAddEdge).toBeCalledWith('node-a', 'node-b');
    });

    it('should forward on move event', () => {
      const onMove = jest.fn();

      const wrapper = shallow(<Editor onMove={onMove} />);
      const petriNetGraph = wrapper.find(PetriNetGraph);
      petriNetGraph.props().onMove('node-id', { x: 100, y: 200 });

      expect(onMove).toBeCalledWith('node-id', { x: 100, y: 200 });
    });
  });
});
