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

class ServiceWorkerInstaller extends React.Component {
  state = {
    installing: false
  };

  beforeInstallPromptEvent = null;

  componentDidMount() {
    serviceWorker.register({
      onBeforeInstallPrompt: e => {
        console.log(e.platforms);
        this.beforeInstallPromptEvent = e;
        console.log('App is ready to be installed on home screen!');
      }
    });
  }

  handleInstallRequest = async () => {
    if (this.beforeInstallPromptEvent === null) {
      console.log('App can not be installed - try again later');
      return;
    }
    this.installing = true;
    await this.beforeInstallPromptEvent.prompt();
    const choiceResult = await this.beforeInstallPromptEvent.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    this.beforeInstallPromptEvent = null;
    this.installing = false;
  };

  render() {
    const browserReadyToInstall = this.beforeInstallPromptEvent !== null;
    return this.props.render({
      canBeInstalled: browserReadyToInstall && !this.state.installing,
      handleInstallRequest: this.handleInstallRequest
    });
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ServiceWorkerInstaller
      render={({ handleInstallRequest, canBeInstalled }) => (
        <App
          onInstallClick={handleInstallRequest}
          canBeInstalled={canBeInstalled}
        />
      )}
    />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(startPouchDB());
