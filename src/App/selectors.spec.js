import Immutable from 'seamless-immutable';
import { editableUserIsInConflict } from './selectors';
describe('editableUserIsInConflict selector', () => {
  test('returns true when editable user has conflicts', () => {
    const state = Immutable({
      editableUser: { _conflicts: {} }
    });
    expect(editableUserIsInConflict(state)).toBe(true);
  });

  test('returns false on when editable user has NO conflicts', () => {
    const state = Immutable({
      editableUser: {}
    });
    expect(editableUserIsInConflict(state)).toBeFalsy();
  });

  test('returns false when editable user is missing', () => {
    expect(editableUserIsInConflict(Immutable({}))).toBeFalsy();

    const state = Immutable({
      editableUser: null
    });
    expect(editableUserIsInConflict(state)).toBeFalsy();
  });
});
