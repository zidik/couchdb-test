import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import PouchDB from 'pouchdb';
import UserForm from './UserForm';

const db = new PouchDB('users');
const remoteDB = new PouchDB('http://localhost:5984/users');

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
        <Header as="h1">CouchDB Test</Header>
        Sync status:
        {this.state.remoteDbStatus}
        <Header as="h2">Users</Header>
        <UserList
          users={this.state.users}
          handleSelect={this.handleSelectUser}
          handleNewUser={this.handleNewUser}
          selectedUser={this.state.selectedUser}
        />
        <UserForm
          user={this.state.users[this.state.selectedUser]}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const UserList = ({ users, handleSelect, handleNewUser, selectedUser }) => (
  <List selection>
    {Object.values(users).map(user => (
      <UserListItem
        active={user._id === selectedUser}
        key={user._id}
        user={user}
        handleSelect={handleSelect}
      />
    ))}
    <NewUserListItem handleNewUser={handleNewUser} />
  </List>
);

const UserListItem = ({ user, handleSelect, active }) => (
  <List.Item active={active} onClick={() => handleSelect(user._id)}>
    <List.Content>
      <List.Header>{`${user.firstName} ${user.lastName}`}</List.Header>
      <List.Content>${user.email}</List.Content>
    </List.Content>
  </List.Item>
);

const NewUserListItem = ({ handleNewUser }) => (
  <List.Item onClick={handleNewUser}>Add new user</List.Item>
);

export default App;
