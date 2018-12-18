import React from 'react';
import MockRouter from 'react-mock-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import EditorContainer from '../containers/EditorContainer';
import SimulatorContainer from '../containers/SimulatorContainer';
import App from './App';

const mountApp = (props) => (
  mount(
    <Provider store={props.store}>
      <MockRouter location={props.location}>
        <App />
      </MockRouter>
    </Provider>
  )
);
const setupState = () => ({
  petriNets: ['petri-net-id'],
  petriNetsById: {
    'petri-net-id': {
      id: 'petri-net-id',
      edgesById: {},
      nodesById: {},
      markings: [],
    },
  },
});
const setupStore = () => ( configureStore()(setupState()) );

describe('App', () => {
  it('should render editor container if mode is edit', () => {
    const store = setupStore();

    const wrapper = mountApp({ store, location: { pathname: "/petri-net-id/edit" } });
    const editorContainer = wrapper.find(EditorContainer);

    expect(editorContainer.length).toBe(1);
  });

  it('should render simulator container if mode is simulate', () => {
    const store = setupStore();

    const wrapper = mountApp({ store, location: { pathname: "/petri-net-id/simulate" } });
    const simulatorContainer = wrapper.find(SimulatorContainer);

    expect(simulatorContainer.length).toBe(1);
  });
});
