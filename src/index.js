import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import { reducer } from './state/reducer';
import './index.css';
import { startPouchDB } from './state/pouchdbActions';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware))
);

let prompt = () =>
  console.log('App can not be installed yet - try again later');
const executePrompt = () => prompt();

ReactDOM.render(
  <Provider store={store}>
    <App onInstallClick={executePrompt} />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(startPouchDB());

serviceWorker.register({
  onBeforeInstallPrompt: e => {
    console.log(e.platforms);
    prompt = e.prompt;
    console.log('App is ready to be installed on home screen!');
  }
});
