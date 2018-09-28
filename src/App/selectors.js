export const selectedUserIsInConflict = state =>
  state.selectedUserId && //There is a selected user id
  state.users[state.selectedUserId] && // id corresponds to a user
  state.users[state.selectedUserId]._conflicts !== undefined; //..that has conflicts
