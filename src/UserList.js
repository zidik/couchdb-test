import React, { Component } from 'react';
import { List, Label } from 'semantic-ui-react';

const UserList = ({ users, handleSelect, handleNewUser, selectedUser }) => (
  <List selection divided verticalAlign="middle">
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
  <List.Item
    active={active}
    onClick={() => handleSelect(user._id)}
    style={{ position: 'relative' }}
  >
    <List.Header>{`${user.firstName} ${user.lastName}`}</List.Header>
    <List.Content>{user.email}</List.Content>
    {user._conflicts && (
      <Label size="tiny" attached="bottom right" color="orange">
        Conflict
      </Label>
    )}
  </List.Item>
);
const NewUserListItem = ({ handleNewUser }) => (
  <List.Item icon="add" onClick={handleNewUser} header="Add new user" />
);

export default UserList;
