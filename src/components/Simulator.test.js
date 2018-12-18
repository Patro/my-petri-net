import React from 'react';
import { shallow } from 'enzyme';
import * as elementType from '../constants/elementTypes';
import * as nodeType from '../constants/nodeTypes';
import PetriNetGraph from './PetriNetGraph';
import Simulator from './Simulator';
import SimulatorToolbar from './SimulatorToolbar';

describe('Simulator', () => {
  describe('toolbar', () => {
    it('should render simulator toolbar', () => {
      const wrapper = shallow(<Simulator />);
      const toolbar = wrapper.find(SimulatorToolbar);

      expect(toolbar.length).toBe(1);
    });

    it('should forward on reset event', () => {
      const onReset = jest.fn();

      const wrapper = shallow(<Simulator onReset={onReset} />);
      const toolbar = wrapper.find(SimulatorToolbar);
      toolbar.props().onReset();

      expect(onReset).toBeCalled();
    });
  });

  describe('petri net graph', () => {
    const setupPetriNet = () => ({
      id: 'petri-net-id',
      edgesById: {
        'transition-a-id_place-id': {
          id: 'transition-a-id_place-id',
          from: 'transition-a-id',
          to: 'place-id',
          weight: 1,
        },
        'place-id_transition-b-id': {
          id: 'place-id_transition-b-id',
          from: 'place-id',
          to: 'transition-b-id',
          weight: 1,
        },
      },
      nodesById: {
        'transition-a-id': {
          id: 'transition-a-id',
          type: nodeType.TRANSITION,
        },
        'transition-b-id': {
          id: 'transition-b-id',
          type: nodeType.TRANSITION,
        },
        'place-id': {
          id: 'place-id',
          type: nodeType.PLACE,
        },
      },
      markings: [
        {
          'place-id': 0,
        }
      ],
    });

    it('should render petri net graph', () => {
      const wrapper = shallow(<Simulator />);
      const petriNetGraph = wrapper.find(PetriNetGraph);

      expect(petriNetGraph.length).toBe(1);
    });

    it('should set petri net', () => {
      const petriNet = setupPetriNet();

      const wrapper = shallow(<Simulator petriNet={petriNet} />);
      const petriNetGraph = wrapper.find(PetriNetGraph);

      expect(petriNetGraph.props().petriNet).toBe(petriNet);
    });

    it('should highlight active transitions', () => {
      const petriNet = setupPetriNet();

      const wrapper = shallow(<Simulator petriNet={petriNet} />);
      const petriNetGraph = wrapper.find(PetriNetGraph);

      expect(petriNetGraph.props().highlightedIds).toEqual(['transition-a-id']);
    });

    it('should call on fire transition on click on active transition', () => {
      const onFireTransition = jest.fn();
      const petriNet = setupPetriNet();

      const wrapper = shallow(<Simulator petriNet={petriNet} onFireTransition={onFireTransition} />);
      const petriNetGraph = wrapper.find(PetriNetGraph);
      petriNetGraph.props().onClickOnElement(elementType.node, 'transition-a-id');

      expect(onFireTransition).toBeCalledWith('transition-a-id');
    });

    it('should not call on fire transition on click on inactive transition', () => {
      const onFireTransition = jest.fn();
      const petriNet = setupPetriNet();

      const wrapper = shallow(<Simulator petriNet={petriNet} onFireTransition={onFireTransition} />);
      const petriNetGraph = wrapper.find(PetriNetGraph);
      petriNetGraph.props().onClickOnElement(elementType.node, 'transition-b-id');

      expect(onFireTransition).not.toBeCalledWith('transition-b-id');
    });
  });

  it('should call on reset on unmount', () => {
    const onReset = jest.fn();

    const wrapper = shallow(<Simulator onReset={onReset} />);
    wrapper.unmount();

    expect(onReset).toBeCalled();
  });
});
