import { connect } from 'react-redux';
import { createUser, updateUser } from '../../state/pouchdbActions';
import Component from './component';
import { selectUser } from '../../state/actions';

const mapStateToProps = (state, ownProps) => ({
  key: state.selectedUserId, // This ensures, that new form will be created (reset) each time the _id changes.
  user: (state.selectedUserId && state.users[state.selectedUserId]) || {
    firstName: '',
    lastName: '',
    email: ''
  }
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
    const resolved = await dispatch(
      isNewUser ? createUser(updatedUser) : updateUser(updatedUser)
    );
    dispatch(selectUser(resolved.payload.id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
