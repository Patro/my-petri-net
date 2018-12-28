import React from 'react';
import { shallow } from 'enzyme';
import * as elementType from '../constants/elementTypes';
import * as nodeType from '../constants/nodeTypes';
import GraphAnimation from './GraphAnimation';
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

    it('should not highlight any transition after click on active transition', () => {
      const petriNet = setupPetriNet();

      const wrapper = shallow(<Simulator petriNet={petriNet} />);
      wrapper.instance().handleClickOnElement(elementType.node, 'transition-a-id');
      const petriNetGraph = wrapper.find(PetriNetGraph);

      expect(petriNetGraph.props().highlightedIds).toEqual([]);
    });

    it('should render graph animation with element id on click on active transition', () => {
      const petriNet = setupPetriNet();

      const wrapper = shallow(<Simulator petriNet={petriNet} />);
      wrapper.instance().handleClickOnElement(elementType.node, 'transition-a-id');
      const graphAnimation = wrapper.find(GraphAnimation);

      expect(graphAnimation.props().elementId).toBe('transition-a-id');
    });

    it('should not render graph animation on click on inactive transition', () => {
      const petriNet = setupPetriNet();

      const wrapper = shallow(<Simulator petriNet={petriNet} />);
      wrapper.instance().handleClickOnElement(elementType.node, 'transition-b-id');
      const graphAnimation = wrapper.find(GraphAnimation);

      expect(graphAnimation.length).toBe(0);
    });

    it('should call on fire transition on animation end', () => {
      const onFireTransition = jest.fn();
      const petriNet = setupPetriNet();

      const wrapper = shallow(<Simulator petriNet={petriNet} onFireTransition={onFireTransition} />);
      wrapper.instance().handleClickOnElement(elementType.node, 'transition-a-id');
      const graphAnimation = wrapper.find(GraphAnimation);
      graphAnimation.props().onEnd();

      expect(onFireTransition).toBeCalledWith('transition-a-id');
    });
  });

  it('should call on reset on unmount', () => {
    const onReset = jest.fn();

    const wrapper = shallow(<Simulator onReset={onReset} />);
    wrapper.unmount();

    expect(onReset).toBeCalled();
  });
});
