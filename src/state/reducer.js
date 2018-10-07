import { USER_SELECTED } from './actionTypes';
import { combineReducers } from 'redux';
import { LOAD_ALL_USERS, USER_CHANGE_RECEIVED } from './pouchdbActions';

const selectedUserId = (state = null, { payload, type }) => {
  switch (type) {
    case USER_SELECTED:
      return payload;
    default:
      return state;
  }
};

const docArrayToObject = arr =>
  arr.reduce((acc, doc) => {
    acc[doc._id] = doc;
    return acc;
  }, {});

const users = (state = {}, { type, payload }) => {
  switch (type) {
    case LOAD_ALL_USERS: {
      const loadedUsers = docArrayToObject(payload.users);
      return {
        ...state,
        ...loadedUsers
      };
    }
    case USER_CHANGE_RECEIVED: {
      const { user } = payload;
      return {
        ...state,
        [user._id]: user
      };
    }
    default:
      return state;
  }
};

const userConflicts = (state = {}, { type, payload }) => {
  //Insert conflict into the tree
  //First level is ID, second level is REV
  const insertConflict = (tree = {}, conflict) => ({
    ...tree,
    [conflict._id]: {
      ...tree[conflict._id],
      [conflict._rev]: conflict
    }
  });
  //TODO: Clean up state time after time from conflicts that are already resolved
  switch (type) {
    case USER_CHANGE_RECEIVED:
    case LOAD_ALL_USERS: {
      const { conflicts } = payload;
      //Insert all conflicts into the state tree
      return conflicts.reduce(insertConflict, state);
    }
    default:
      return state;
  }
};

export const reducer = combineReducers({
  users,
  userConflicts,
  selectedUserId
});
