import React from 'react';
import { Header, Button, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import UserList from './UserList';
import UserForm from './UserForm';
import UserMergeForm from './UserMergeForm';
import useServiceWorker from './useServiceWorker';

const App = function({ remoteDbStatus, selectedUserIsInConflict }) {
  const { installable, installing, handleInstallRequest } = useServiceWorker();

  return (
    <div className="App">
      <div className="App-header">
        <Header as="h1">CouchDB Test</Header>
      </div>
      <div className="sidebar panel">
        <Header as="h2">Users</Header>
        <UserList />
      </div>
      <div className="content panel">
        {selectedUserIsInConflict ? <UserMergeForm /> : <UserForm />}
      </div>
      <div className="App-footer">
        {installable && (
          <Button icon labelPosition="right" onClick={handleInstallRequest}>
            Install App
            <Icon name="cloud download" />
          </Button>
        )}
        Sync status:
        {remoteDbStatus}
      </div>
    </div>
  );
};

export default App;
