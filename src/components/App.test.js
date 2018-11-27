import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import rootReducer from './../reducers';
import App from './App';

it('renders without crashing', () => {
  const store = createStore(rootReducer);
  mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
