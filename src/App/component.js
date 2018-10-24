import React from 'react';
import { Header, Button, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import UserList from './UserList';
import UserForm from './UserForm';
import UserMergeForm from './UserMergeForm';

const App = ({
  remoteDbStatus,
  selectedUserIsInConflict,
  onInstallRequest,
  canBeInstalled
}) => (
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
      {canBeInstalled && (
        <Button icon labelPosition="right" onClick={onInstallRequest}>
          Install App
          <Icon name="cloud download" />
        </Button>
      )}
      Sync status:
      {remoteDbStatus}
    </div>
  </div>
);

export default App;
