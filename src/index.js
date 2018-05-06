import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { reducer } from './state/reducer';
import './index.css';
import { startPouchDB } from './state/pouchdbActions';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(startPouchDB());

registerServiceWorker();
