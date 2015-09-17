// import 'babel-core/polyfill';
import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route, DefaultRoute } from 'react-router';
import configureStore from './store/configureStore';
import App from './containers/App';
import MappingsPage from './containers/MappingsPage';

const history = createBrowserHistory();
const store = configureStore();

React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route component={App}>
          <Route path="/" component={MappingsPage} />
        </Route>
      </Router>
    }
  </Provider>,
  document.getElementById('root')
);

