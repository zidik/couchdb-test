import { connect } from 'react-redux';
import { createUser, updateUser } from '../../state/pouchdbActions';
import Component from './component';
import { selectEditableUserById } from '../../state/actions';

const mapStateToProps = (state, ownProps) => ({
  key: state.editableUser && state.editableUser._id, // This ensures, that new form will be created (reset) each time the _id changes.
  user: state.editableUser || { firstName: '', lastName: '', email: '' }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: async (user, { firstName, lastName, email }) => {
    const isNewUser = user._id === undefined;
    //Merge updates to the existing user:
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email
    };
    await dispatch(
      isNewUser ? createUser(updatedUser) : updateUser(updatedUser)
    );
    dispatch(selectEditableUserById(user._id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
