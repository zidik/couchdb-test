import Immutable from 'seamless-immutable';
import { selectedUserIsInConflict } from './selectors';
describe('selectedUserIsInConflict selector', () => {
  test('returns true when selected user has conflicts', () => {
    const state = Immutable({
      users: { 'my-id': { _conflicts: {} } },
      selectedUserId: 'my-id'
    });
    expect(selectedUserIsInConflict(state)).toBe(true);
  });

  test('is falsy on when selected user has NO conflicts', () => {
    const state = Immutable({
      users: { 'my-id': {} },
      selectedUserId: 'my-id'
    });
    expect(selectedUserIsInConflict(state)).toBeFalsy();
  });

  test('is falsy when selected user is missing', () => {
    const state = Immutable({
      users: {},
      selectedUserId: 'my-id'
    });
    expect(selectedUserIsInConflict(state)).toBeFalsy();
  });

  test('is falsy when no user is selected', () => {
    const state = Immutable({
      selectedUserId: null
    });
    expect(selectedUserIsInConflict(state)).toBeFalsy();
  });
});
