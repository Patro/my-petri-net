import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import rootReducer from './reducers';
import inititalState from './initialState';
import './index.css';

const store = createStore(rootReducer, inititalState);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/:id/:mode(edit|simulate)" component={App} />
        <Redirect from="/:id" to="/:id/edit" />
        <Redirect to={`/${store.getState().petriNets[0]}/edit`} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
