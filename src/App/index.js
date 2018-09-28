import { connect } from 'react-redux';
import Component from './component';
import { selectedUserIsInConflict } from './selectors';

const mapStateToProps = state => ({
  remoteDbStatus: 'TEST',
  selectedUserIsInConflict: selectedUserIsInConflict(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
