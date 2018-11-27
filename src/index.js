import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
import './index.css';

const store = createStore(rootReducer);

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
