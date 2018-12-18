import React from 'react';
import MockRouter from 'react-mock-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { FIRE_TRANSITION, RESET_MARKINGS } from '../actions';
import Simulator from '../components/Simulator';
import SimulatorContainer from './SimulatorContainer';

const mountContainer = (props) => (
  mount(
    <Provider store={props.store}>
      <MockRouter params={props.params}>
        <SimulatorContainer />
      </MockRouter>
    </Provider>
  )
);
const setupParams = () => ({
  id: 'petri-net-uuid-1',
});
const setupState = () => ({
  petriNetsById: {
    'petri-net-uuid-1': {
      id: 'petri-net-uuid-1',
      edgesById: {},
      nodesById: {},
      markings: [],
    },
  },
});
const setupStore = (state = setupState()) => ( configureStore()(state) );

describe('SimulatorContainer', () => {
  it('should map current petri net from store to prop', () => {
    const params = setupParams();
    const state = setupState();
    const store = setupStore(state);

    const wrapper = mountContainer({ store, params })
    const simulator = wrapper.find(Simulator);

    expect(simulator.props().petriNet).toEqual(state.petriNetsById['petri-net-uuid-1']);
  });

  it('should dispatch fire transition action on fire transition event', () => {
    const params = setupParams();
    const store = setupStore();

    const wrapper = mountContainer({ store, params });
    const simulator = wrapper.find(Simulator);
    simulator.props().onFireTransition('transition-id');

    const action = store.getActions()[0];
    const expectedAction = {
      type: FIRE_TRANSITION,
      petriNetId: 'petri-net-uuid-1',
      transitionId: 'transition-id',
    };
    expect(action).toMatchObject(expectedAction);
  });

  it('should dispatch reset markings action on reset event', () => {
    const params = setupParams();
    const store = setupStore();

    const wrapper = mountContainer({ store, params });
    const simulator = wrapper.find(Simulator);
    simulator.props().onReset();

    const action = store.getActions()[0];
    const expectedAction = { type: RESET_MARKINGS, petriNetId: 'petri-net-uuid-1' };
    expect(action).toMatchObject(expectedAction);
  });
});
