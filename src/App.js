import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import PouchDB from 'pouchdb';
import UserForm from './UserForm';
import UserList from './UserList';
import ConflictResolution from './ConflictResolution';

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
    conflicts: {},
    selectedUser: null
  };

  handleSubmit = async user => {
    const isNewUser = user._id === undefined;
    try {
      const response = await (isNewUser ? db.post(user) : db.put(user));
      console.assert(response.ok);
      this.setState({ selectedUser: response.id });
    } catch (err) {
      if (err.name === 'conflict') {
        // IMMEDIATE conflict! (Not currently handled)
      } else {
        // some other error
      }
      throw err;
    }
  };
  handleConflictResolution = async (updatedUser, conflictingUser) => {
    this.handleSubmit(updatedUser);
    const response = await db.remove(conflictingUser);
    console.assert(response.ok);
  };

  handleDbChange = async ({ id, seq, changes, doc }) => {
    this.setState(state => ({
      users: {
        ...state.users,
        [id]: doc
      }
    }));
    //If the document contains any "_conflict" references, pull all the conflicting documents and save to local state.
    if (doc._conflicts) {
      const conflictArray = await this.getDocConflicts(doc);
      this.insertConflictsToState(conflictArray);
    }
  };

  async getDocConflicts(doc) {
    if (!doc._conflicts) return [];
    const promises = doc._conflicts.map(rev => db.get(doc._id, { rev }));
    return await Promise.all(promises);
  }
  //TODO: Clean up state time after time from conflicts that are already resolved
  insertConflictsToState(conflicts) {
    const addConflictToCollection = (collection, conflict) => {
      if (!collection) collection = {};
      if (!collection[conflict._id]) collection[conflict._id] = {};
      collection[conflict._id][conflict._rev] = conflict;
      return collection;
    };
    this.setState(state => ({
      conflicts: conflicts.reduce(addConflictToCollection, state.conflicts)
    }));
  }

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
        conflicts: true,
        include_docs: true
      })
      .on('change', this.handleDbChange);

    const response = await await db.allDocs({
      include_docs: true,
      conflicts: true,
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
    const promises = response.rows.map(({ doc }) => this.getDocConflicts(doc));
    const conflicts = (await Promise.all(promises)).reduce(
      (acc, val) => acc.concat(val),
      []
    );
    this.insertConflictsToState(conflicts);
  }

  handleSelectUser = id => this.setState({ selectedUser: id });
  handleNewUser = () => this.setState({ selectedUser: null });
  render() {
    const user = this.state.users[this.state.selectedUser];
    const conflictingUser =
      user &&
      user._conflicts &&
      this.state.conflicts &&
      this.state.conflicts[user._id] &&
      this.state.conflicts[user._id] &&
      this.state.conflicts[user._id][user._conflicts[0]];

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
          {user && user._conflicts ? (
            <ConflictResolution
              winningUser={user}
              conflictingUser={conflictingUser}
              onSubmit={this.handleConflictResolution}
            />
          ) : (
            <UserForm user={user} onSubmit={this.handleSubmit} />
          )}
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
