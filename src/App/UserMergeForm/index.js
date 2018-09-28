import { connect } from 'react-redux';
import { resolveUserConflict } from '../../state/pouchdbActions';
import Component from './component';

const mapStateToProps = ({ userConflicts, users, editableUser }, ownProps) => {
  const id = editableUser._id;
  const conflictingVersions =
    userConflicts &&
    userConflicts[id] &&
    Object.entries(userConflicts[id])
      .filter(([rev, conflict]) => editableUser._conflicts.includes(rev))
      .map(([rev, conflict]) => conflict);

  return {
    editableUser,
    key: editableUser && editableUser._id, // This ensures, that new form will be created (reset) each time the _id changes.
    versions: [users[id], ...conflictingVersions]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: async (user, versions) => {
    await dispatch(resolveUserConflict(user, versions));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
