import * as actionTypes from './actionTypes';

export const selectEditableUser = user => ({
  type: actionTypes.EDITABLE_USER_SELECTED,
  payload: user
});

export const selectEditableUserById = id => (dispatch, getState) => {
  console.log(id);
  const { users } = getState();
  console.log(users[id]);
  dispatch(selectEditableUser(users[id]));
};
