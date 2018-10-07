import React from 'react';
import { Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import UserList from './UserList';
import UserForm from './UserForm';
import UserMergeForm from './UserMergeForm';

const App = ({ remoteDbStatus, selectedUserIsInConflict }) => (
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
      Sync status:
      {remoteDbStatus}
    </div>
  </div>
);

export default App;
