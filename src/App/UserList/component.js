import React from 'react';
import { List, Label } from 'semantic-ui-react';

export const UserList = ({
  users,
  handleSelect,
  handleNewUser,
  selectedUserId
}) => (
  <List selection divided verticalAlign="middle">
    <NewUserListItem handleNewUser={handleNewUser} />
    {Object.values(users).map(user => (
      <UserListItem
        active={user._id === selectedUserId}
        key={user._id}
        user={user}
        handleSelect={handleSelect}
      />
    ))}
  </List>
);
export const UserListItem = ({ user, handleSelect, active }) => (
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
export const NewUserListItem = ({ handleNewUser }) => (
  <List.Item icon="add" onClick={handleNewUser} header="Add new user" />
);

export default UserList;
