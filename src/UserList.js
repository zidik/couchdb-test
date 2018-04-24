import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

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
      <List.Content>{user.email}</List.Content>
    </List.Content>
  </List.Item>
);
const NewUserListItem = ({ handleNewUser }) => (
  <List.Item onClick={handleNewUser}>Add new user</List.Item>
);

export default UserList;
