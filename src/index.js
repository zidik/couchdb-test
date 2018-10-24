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

const beforeInstallPromptEventInitalValue = {
  prompt: () => console.log('App can not be installed - try again later')
};

let beforeInstallPromptEvent = beforeInstallPromptEventInitalValue;

const handleInstallClick = async () => {
  await beforeInstallPromptEvent.prompt();
  const choiceResult = await beforeInstallPromptEvent.userChoice;
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }
  beforeInstallPromptEvent = beforeInstallPromptEventInitalValue;
};

ReactDOM.render(
  <Provider store={store}>
    <App onInstallClick={handleInstallClick} />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(startPouchDB());

serviceWorker.register({
  onBeforeInstallPrompt: e => {
    console.log(e.platforms);
    beforeInstallPromptEvent = e;
    console.log('App is ready to be installed on home screen!');
  }
});
