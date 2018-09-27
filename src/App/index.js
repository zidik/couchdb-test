import { connect } from 'react-redux';
import Component from './component';
import { editableUserIsInConflict } from './selectors';

const mapStateToProps = state => ({
  remoteDbStatus: 'TEST',
  editableUserIsInConflict: editableUserIsInConflict(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
