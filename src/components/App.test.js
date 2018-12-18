import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import rootReducer from './../reducers';
import EditorContainer from '../containers/EditorContainer';
import App from './App';

describe('App', () => {
  it('should render editor container if mode is edit', () => {
    const state = {
      petriNetsById: {
        'petri-net-id': {
          id: 'petri-net-id',
          edgesById: {},
          nodesById: {},
          markings: [],
        },
      },
    };
    const store = createStore(rootReducer, state);

    const wrapper = mount(
      <Provider store={store}>
        <StaticRouter location={{ pathname: "/petri-net-id/edit" }} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const editorContainer = wrapper.find(EditorContainer);

    expect(editorContainer.length).toBe(1);
  });
});
