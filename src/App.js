import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import PouchDB from 'pouchdb';
import UserForm from './UserForm';
import UserList from './UserList';

const dbName = 'users';
const db = new PouchDB(dbName);
const remoteDbCredentials = {
  username: '6c37d55c-6b96-4e4f-9113-87c36c2a5060-bluemix',
  password: 'eb89e1a5aab226c933a959868c659ea57a99702594f183208b04e8476ce1c65d',
  host: '6c37d55c-6b96-4e4f-9113-87c36c2a5060-bluemix.cloudant.com'
};
const getRemoteDbUrl = ({ username, password, host }) =>
  `https://${username}:${password}@${host}`;
const remoteDbUrl = getRemoteDbUrl(remoteDbCredentials);
const remoteDB = new PouchDB(`${remoteDbUrl}/${dbName}`);

class App extends Component {
  state = {
    remoteDbStatus: 'unknown',
    users: {},
    selectedUser: null
  };
  handleSubmit = async user => {
    const isNewUser = user._id === undefined;
    const response = await (isNewUser ? db.post(user) : db.put(user));
    console.assert(response.ok);
    this.setState({ selectedUser: response.id });
  };

  handleDbChange = ({ id, seq, changes, doc }) => {
    this.setState(state => ({
      users: {
        ...state.users,
        [id]: doc
      }
    }));
  };

  async componentDidMount() {
    db
      .sync(remoteDB, {
        live: true,
        retry: true
      })
      .on('change', change => {})
      .on('paused', err =>
        this.setState({ remoteDbStatus: err ? 'No connection' : 'Idle' })
      )
      .on('active', info => this.setState({ remoteDbStatus: 'Active' }))
      .on('error', err => this.setState({ remoteDbStatus: 'Error' }));

    db
      .changes({
        since: 'now',
        live: true,
        include_docs: true
      })
      .on('change', this.handleDbChange);

    const response = await await db.allDocs({
      include_docs: true,
      descending: true
    });
    const newUsers = response.rows.reduce((acc, row) => {
      acc[row.id] = row.doc;
      return acc;
    }, {});

    this.setState(state => {
      const users = {
        ...state.users,
        ...newUsers
      };
      return {
        users,
        selectedUser: Object.keys(users)[0]
      };
    });
  }

  handleSelectUser = id => this.setState({ selectedUser: id });
  handleNewUser = () => this.setState({ selectedUser: null });
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header as="h1">CouchDB Test</Header>
        </div>
        <div className="sidebar panel">
          <Header as="h2">Users</Header>
          <UserList
            users={this.state.users}
            handleSelect={this.handleSelectUser}
            handleNewUser={this.handleNewUser}
            selectedUser={this.state.selectedUser}
          />
        </div>
        <div className="content panel">
          <UserForm
            user={this.state.users[this.state.selectedUser]}
            onSubmit={this.handleSubmit}
          />
        </div>
        <div className="App-footer">
          Sync status:
          {this.state.remoteDbStatus}
        </div>
      </div>
    );
  }
}

export default App;
