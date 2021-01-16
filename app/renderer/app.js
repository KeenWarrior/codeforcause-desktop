import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import Routes from './routes';
import configureStore from './store';
import Auth from './auth';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from './theme';

const syncHistoryWithStore = (store, history) => {
  const { router } = store.getState();
  if (router && router.location) {
    history.replace(router.location);
  }
};

const initialState = {};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>
      <ThemeProvider theme={createTheme()}>
        <Auth>
          <Routes />
        </Auth>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  rootElement,
);
