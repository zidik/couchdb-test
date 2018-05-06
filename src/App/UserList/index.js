import { connect } from 'react-redux';
import { selectEditableUser } from '../../state/actions';
import Component from './component';

const mapStateToProps = state => ({
  selectedUserId: state.editableUser && state.editableUser._id,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  handleSelect: user => dispatch(selectEditableUser(user)),
  handleNewUser: () => dispatch(selectEditableUser(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
