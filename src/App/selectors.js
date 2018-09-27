export const editableUserIsInConflict = state =>
  state.editableUser && state.editableUser._conflicts !== undefined;
