import * as actionTypes from './actionTypes';

export const selectEditableUser = user => ({
  type: actionTypes.EDITABLE_USER_SELECTED,
  payload: user
});
