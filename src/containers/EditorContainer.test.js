import React from 'react';
import MockRouter from 'react-mock-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { ADD_EDGE, ADD_NODE, MOVE_NODE } from '../actions';
import Editor from '../components/Editor';
import * as nodeType from '../constants/nodeTypes';
import rootReducer from '../reducers';
import EditorContainer from './EditorContainer';

const mockStore = configureStore();
const mountContainer = (props) => (
  mount(
  <Provider store={props.store}>
    <MockRouter params={props.params}>
      <EditorContainer />
    </MockRouter>
  </Provider>
  )
);
const setupParams = () => ({
  id: 'petri-net-uuid-2',
});
const setupState = () => ({
  petriNetsById: {
    'petri-net-uuid-1': {
      id: 'petri-net-uuid-1',
      data: 'data-1',
      edgesById: {},
      nodesById: {},
      markings: [],
    },
    'petri-net-uuid-2': {
      id: 'petri-net-uuid-2',
      data: 'data-2',
      edgesById: {},
      nodesById: {},
      markings: [],
    }
  },
})

describe('EditorContainer', () => {
  it('should map current petri net from store to prop', () => {
    const params = setupParams();
    const state = setupState();
    const store = createStore(rootReducer, state);

    const wrapper = mountContainer({ store, params })
    const editor = wrapper.find(Editor);

    expect(editor.prop('petriNet')).toEqual(state.petriNetsById['petri-net-uuid-2']);
  });

  it('should dispatch add edge action on add edge event', () => {
    const params = setupParams();
    const state = setupState();
    const store = mockStore(state);

    const wrapper = mountContainer({ store, params });
    const editor = wrapper.find(Editor);
    editor.props().onAddEdge('node-a', 'node-b');

    const action = store.getActions()[0];
    const expectedAction = {
      type: ADD_EDGE,
      petriNetId: 'petri-net-uuid-2',
      from: 'node-a',
      to: 'node-b',
    };
    expect(action).toMatchObject(expectedAction);
  });

  it('should dispatch add node action on add node event', () => {
    const params = setupParams();
    const state = setupState();
    const store = mockStore(state);

    const wrapper = mountContainer({ store, params });
    const editor = wrapper.find(Editor);
    editor.props().onAddNode(nodeType.PLACE, { x: 100, y: 200 });

    const action = store.getActions()[0];
    const expectedAction = {
      type: ADD_NODE,
      petriNetId: 'petri-net-uuid-2',
      nodeType: nodeType.PLACE,
      position: { x: 100, y: 200 },
    };
    expect(action).toMatchObject(expectedAction);
  });

  it('should dispatch move node action on move event', () => {
    const params = setupParams();
    const state = setupState();
    const store = mockStore(state);

    const wrapper = mountContainer({ store, params });
    const editor = wrapper.find(Editor);
    editor.props().onMove('node-a', { x: 100, y: 200 });

    const action = store.getActions()[0];
    const expectedAction = {
      type: MOVE_NODE,
      petriNetId: 'petri-net-uuid-2',
      nodeId: 'node-a',
      position: { x: 100, y: 200 },
    };
    expect(action).toMatchObject(expectedAction);
  });
});
