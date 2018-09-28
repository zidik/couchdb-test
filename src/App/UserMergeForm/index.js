import { connect } from 'react-redux';
import { resolveUserConflict } from '../../state/pouchdbActions';
import Component from './component';

const mapStateToProps = (
  { userConflicts, users, selectedUserId },
  ownProps
) => {
  const user = users[selectedUserId];
  const conflictingVersions =
    userConflicts &&
    userConflicts[selectedUserId] &&
    Object.entries(userConflicts[selectedUserId])
      .filter(([rev, conflict]) => user._conflicts.includes(rev))
      .map(([rev, conflict]) => conflict);

  return {
    user: user,
    key: selectedUserId, // This ensures, that new form will be created (reset) each time the _id changes.
    versions: [user, ...conflictingVersions]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: async (user, versions) => {
    await dispatch(resolveUserConflict(user, versions));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
