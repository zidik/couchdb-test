import { connect } from 'react-redux';
import { selectUser } from '../../state/actions';
import Component from './component';

const mapStateToProps = state => ({
  selectedUserId: state.selectedUserId,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  handleSelect: id => dispatch(selectUser(id)),
  handleNewUser: () => dispatch(selectUser(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
