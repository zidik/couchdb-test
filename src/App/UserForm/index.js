import { connect } from 'react-redux';
import { createUser, updateUser } from '../../state/pouchdbActions';
import Component from './component';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: async user => {
    const isNewUser = user._id === undefined;
    await dispatch(isNewUser ? createUser(user) : updateUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
