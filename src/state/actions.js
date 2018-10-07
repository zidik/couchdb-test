import * as actionTypes from './actionTypes';

export function selectUser(id) {
  if (id === undefined) throw new Error('Missing argument');

  return {
    type: actionTypes.USER_SELECTED,
    payload: id
  };
}
